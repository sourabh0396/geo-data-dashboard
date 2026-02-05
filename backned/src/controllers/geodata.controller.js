import GeoData from "../models/geodata.model.js";

export const getGeoData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const search = req.query.search || "";
    const status = req.query.status;

    const query = {
      projectName: { $regex: search, $options: "i" },
    };

    if (status) {
      query.status = status;
    }

    const total = await GeoData.countDocuments(query);

    const records = await GeoData.find(query)
      .sort({ lastUpdated: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({
      data: records,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

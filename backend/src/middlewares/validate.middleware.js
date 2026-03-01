import { z } from "zod";

export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const tree = z.treeifyError(result.error);
      return res.status(400).json({
        success: false,
        errors: tree.properties,
      });
    }

    req.body = result.data;
    next();
  };
};

export const errorMiddleware = (err, req, res, next) => {
  try {
    const status = err.status || 500;
    const message = err.message || `Something went wrong`;

    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

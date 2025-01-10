const MonitorApp = (req, res, next) => {
  console.log(`${Date()} - Method : ${req.method} | URL : ${req.url}`);
  next();
}

export {MonitorApp};
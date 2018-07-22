exports.isValidRequestFromBrowser = (req, commonBrowsers) => {
  const reqHeaderHasValidUserAgent = commonBrowsers.hasOwnProperty(req.useragent.browser);
  const reqHeaderHasValidContentType = req.headers.accept.startsWith('application/json');
  return reqHeaderHasValidUserAgent && reqHeaderHasValidContentType
};

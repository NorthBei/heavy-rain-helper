import FaxDoc from './FaxDoc'

class XHeavyRainFax extends FaxDoc {
  constructor (reportDateTime) {
    super(FaxDoc.X_HEAVY_RAIN, reportDateTime)
  }
}

export default XHeavyRainFax

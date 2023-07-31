import FaxDoc from './FaxDoc'

class HeavyRainFax extends FaxDoc {
  constructor (reportDateTime) {
    super(FaxDoc.HEAVY_RAIN, reportDateTime)
  }
}

export default HeavyRainFax

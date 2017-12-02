import TextGear from './text_gear'
import JapaneseLint from './japanese_lint'
import YahooProofread from './yahoo_proofread'
import GoogleTranslate from './google_translate'

const classes = {
  TextGear,
  JapaneseLint,
  YahooProofread,
  GoogleTranslate
}

export const classFactory = (className: string): Object => ( classes[className] )

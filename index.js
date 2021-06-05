
const plugin = (md, options_) => {
  let options = {
    dictionary: {},
    wholeWords: true,
  }
  options = Object.assign(options, options_)

  function autoCrosslinker(state) {
    //console.log('##########')
    for (const [key, values] of Object.entries(options.dictionary)) {
      const finds = values
        .map(v => ({
          v,
          i: options.wholeWords ? state.src.search(new RegExp("\\b" + v + "\\b")) : state.src.indexOf(v),
          r: options.wholeWords ? new RegExp("\\b" + v + "\\b") : v
        }))
        .filter(o => o.i > -1)
        .sort((a, b) => a.i - b.i || b.v.length - a.v.length)

      if (finds.length > 0) {
        const repl = `[${finds[0].v}](${key})`
        state.src = state.src.replace(finds[0].r, repl)
      }
    }
    //console.log(state.src)
  }

  md.core.ruler.before('normalize', 'auto-crosslinker', autoCrosslinker)
};

module.exports=plugin

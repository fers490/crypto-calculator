const themeMapping = {
    util: 'hover:bg-slate-400 bg-slate-300 text-black',
    number: 'hover:bg-slate-600 bg-slate-700 text-white',
    operation: 'hover:bg-amber-400 bg-amber-500 text-white',
    operationActive: 'hover:text-amber-400 bg-white text-amber-500'
}

const baseStyles = 'text-2xl font-bold px-3 py-2 shadow-sm border-solid border-2 border-slate-800'

function Button(props) {
    let style = baseStyles
    let theme = props.theme
    if (theme === 'operation' && props.active) {
        theme = 'operationActive'
    }
    if (themeMapping[theme]) {
        style += ' ' + themeMapping[theme]
    }
    if (props.colspan) {
        style += ' col-span-'+props.colspan
    }
  return (
    <button onClick={props.onClick} className={style}>{props.text}</button>
  );
}

export default Button;

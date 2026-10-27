// Ícones SVG simples e decorativos (aria-hidden). O significado é sempre
// transmitido também por texto ao lado do ícone.
const propsBase = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

function criar(caminhos) {
  return function Icone(props) {
    return (
      <svg {...propsBase} {...props}>
        {caminhos}
      </svg>
    );
  };
}

export const IconeCheck = criar(<path d="M5 12.5l4.5 4.5L19 7.5" />);
export const IconeX = criar(<path d="M6 6l12 12M18 6L6 18" />);
export const IconeMenu = criar(<path d="M4 6h16M4 12h16M4 18h16" />);
export const IconeAlerta = criar(
  <>
    <path d="M12 3l10 18H2L12 3z" />
    <path d="M12 10v4M12 17.5v.01" />
  </>,
);
export const IconeTag = criar(
  <>
    <path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L3 13V3h10l7.6 7.6a2 2 0 010 2.8z" />
    <circle cx="7.5" cy="7.5" r="1" />
  </>,
);
export const IconeGarrafa = criar(
  <>
    <path d="M10 2h4v4l1.5 3v11a2 2 0 01-2 2h-3a2 2 0 01-2-2V9L10 6V2z" />
    <path d="M8.5 14h7" />
  </>,
);

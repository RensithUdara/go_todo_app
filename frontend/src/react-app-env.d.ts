/// <reference types="react-scripts" />

declare namespace JSX {
  interface IntrinsicElements {
    path: React.SVGProps<SVGPathElement>;
    circle: React.SVGProps<SVGCircleElement>;
    polyline: React.SVGProps<SVGPolylineElement>;
    line: React.SVGProps<SVGLineElement>;
  }
}

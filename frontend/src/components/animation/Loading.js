import React from "react";
import LoadingCss from "../../styles/loading.module.css";
export default function Loading() {
  return (
    <div className={LoadingCss.loadingContainer}>
      <svg
        color="blue"
        width="150"
        height="150"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <circle cx="12" cy="3" r="1">
            <animate
              id="a"
              begin="0;l.end-0.5s"
              attributeName="r"
              calcMode="spline"
              dur="0.6s"
              values="1;2;1"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            />
          </circle>
          <circle cx="16.50" cy="4.21" r="1">
            <animate
              id="b"
              begin="a.begin+0.1s"
              attributeName="r"
              calcMode="spline"
              dur="0.6s"
              values="1;2;1"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            />
          </circle>
          <circle cx="7.50" cy="4.21" r="1">
            <animate
              id="l"
              begin="k.begin+0.1s"
              attributeName="r"
              calcMode="spline"
              dur="0.6s"
              values="1;2;1"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            />
          </circle>
          <circle cx="19.79" cy="7.50" r="1">
            <animate
              id="c"
              begin="b.begin+0.1s"
              attributeName="r"
              calcMode="spline"
              dur="0.6s"
              values="1;2;1"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            />
          </circle>
          <circle cx="4.21" cy="7.50" r="1">
            <animate
              id="k"
              begin="j.begin+0.1s"
              attributeName="r"
              calcMode="spline"
              dur="0.6s"
              values="1;2;1"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            />
          </circle>
          <circle cx="21.00" cy="12.00" r="1">
            <animate
              id="d"
              begin="c.begin+0.1s"
              attributeName="r"
              calcMode="spline"
              dur="0.6s"
              values="1;2;1"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            />
          </circle>
          <circle cx="3.00" cy="12.00" r="1">
            <animate
              id="j"
              begin="i.begin+0.1s"
              attributeName="r"
              calcMode="spline"
              dur="0.6s"
              values="1;2;1"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            />
          </circle>
          <circle cx="19.79" cy="16.50" r="1">
            <animate
              id="e"
              begin="d.begin+0.1s"
              attributeName="r"
              calcMode="spline"
              dur="0.6s"
              values="1;2;1"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            />
          </circle>
          <circle cx="4.21" cy="16.50" r="1">
            <animate
              id="i"
              begin="h.begin+0.1s"
              attributeName="r"
              calcMode="spline"
              dur="0.6s"
              values="1;2;1"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            />
          </circle>
          <circle cx="16.50" cy="19.79" r="1">
            <animate
              id="f"
              begin="e.begin+0.1s"
              attributeName="r"
              calcMode="spline"
              dur="0.6s"
              values="1;2;1"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            />
          </circle>
          <circle cx="7.50" cy="19.79" r="1">
            <animate
              id="h"
              begin="g.begin+0.1s"
              attributeName="r"
              calcMode="spline"
              dur="0.6s"
              values="1;2;1"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            />
          </circle>
          <circle cx="12" cy="21" r="1">
            <animate
              id="g"
              begin="f.begin+0.1s"
              attributeName="r"
              calcMode="spline"
              dur="0.6s"
              values="1;2;1"
              keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            />
          </circle>
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="6s"
            values="360 12 12;0 12 12"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    </div>
  );
}

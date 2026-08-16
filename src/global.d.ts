import type * as React from "react"

/** Props accepted by the custom element. Mirror here whatever you pass to r2wc in index.ts. */
export type IMicrofrontendWebComponentProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
>

// React 19 moved the JSX namespace out of the global scope and into the react
// module, so custom elements are declared as an augmentation of it.
declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            "microfrontend-web-component": IMicrofrontendWebComponentProps
        }
    }
}

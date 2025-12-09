import clsx from "clsx";
import classes from "./Loader.module.css";
import React, {
  ComponentType,
  createContext,
  CSSProperties,
  useContext,
  useMemo,
} from "react";

export interface LoaderProps {
  loading: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

export const LoaderContext = createContext<boolean>(true);

export const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <LoaderContext.Provider value={props.loading}>
      {props.children}
    </LoaderContext.Provider>
  );
};

export interface IBaseLoadableProps {
  loadVariant?: "text" | "block" | "none";
  loadStyles?: React.CSSProperties;
  loadElement?: React.ReactNode;
  loadClass?: string;
  full?: boolean;
  length?: number;
  invisible?: boolean;
  error?: boolean;
  errorElement?: React.ReactNode;
  min?: number;
  max?: number;
}

const getRandoms = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export type LoadableProps<
  Comp extends React.ComponentType<any> | keyof JSX.IntrinsicElements
> = Omit<React.ComponentProps<Comp>, keyof IBaseLoadableProps | "component"> &
  IBaseLoadableProps & {
    component?: Comp;
    children?: React.ReactNode | React.ReactNode[];
    class?: string;
    props?: Partial<React.ComponentProps<Comp>>;
  };

const allowedLoaderElements: (
  | keyof JSX.IntrinsicElements
  | React.ComponentType
)[] = ["a", "p", "h1", "h2", "h3", "h4", "h5", "h6", "label", "span"];

export const Loadable = <
  Comp extends ComponentType<any> | keyof JSX.IntrinsicElements = "div"
>({
  component,
  children,
  loadElement,
  loadVariant = "text",
  loadStyles = {},
  loadClass,
  full,
  length,
  invisible,
  error,
  errorElement,
  min,
  max,
  props: innerProps,
  ...others
}: LoadableProps<Comp>) => {
  const loading = useContext(LoaderContext);

  const loadingComponent = useMemo<keyof JSX.IntrinsicElements>(
    () =>
      (allowedLoaderElements.includes(component as keyof JSX.IntrinsicElements)
        ? component
        : "div") as keyof JSX.IntrinsicElements,
    [component]
  );

  const LoadComp = (loadingComponent ?? "div") as Comp;
  const RenderComp = component!;

  return (
    <>
      {loadElement !== undefined && loading ? (
        <LoadComp
          {...(innerProps as any)}
          className={clsx(
            classes["loadable"],
            "loading",
            classes[loadVariant],
            loadClass,
            {
              [classes["full"]]: full,
              [classes["invisible"]]: invisible,
            },
            others.className
          )}
          style={{
            ...(others as { style?: React.CSSProperties }).style,
            ...loadStyles,
            "--length": `${length || 4}em`,
          }}
        />
      ) : loading ? (
        <LoadComp
          {...(innerProps as any)}
          component={loadingComponent}
          className={clsx(
            classes["loadable"],
            "loading",
            classes[loadVariant],
            loadClass,
            {
              [classes["full"]]: full,
              [classes["invisible"]]: invisible,
            },
            others.className
          )}
          style={
            {
              ...(others as { style?: React.CSSProperties }).style,
              ...loadStyles,
              "--length": `${length || 4}em`,
            } as CSSProperties
          }
        ></LoadComp>
      ) : error ? (
        errorElement
      ) : !component ? (
        children
      ) : (
        <RenderComp {...(others as any)} {...innerProps}>
          {children}
        </RenderComp>
      )}
    </>
  );
};

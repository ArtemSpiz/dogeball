import clsx from "clsx";
import classes from "./Spinner.module.css";
import React, { CSSProperties } from "react";

export type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: number;
};

const Spinner: React.FC<SpinnerProps> = ({ size = 16, ...others }) => {
  return (
    <div
      {...others}
      className={clsx(classes["spinner-container"], others.className)}
      style={
        {
          "--size": `${size / 4}rem`,
          height: `${size / 4}rem`,
          width: `${size / 4}rem`,
        } as CSSProperties
      }
    >
      <svg
        className={classes["spinner"]}
        viewBox="22 22 44 44"
        style={{ height: "var(--size)", width: "var(--size)" }}
      >
        <circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" />
      </svg>
    </div>
  );
};

export default Spinner;

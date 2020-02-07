import React, { FunctionComponent } from "react";

export const Surfer: FunctionComponent<any> = () => {
  return (
    <div className="sob">
      <div className="sob-head">
        <div className="sob-face">
          <div className="sob-face-highlight"></div>
          <div className="sob-eye sob-eye-left">
            <div className="sob-eye-lid"></div>
            <div className="sob-eye-ball"></div>
          </div>
          <div className="sob-eye sob-eye-right">
            <div className="sob-eye-lid"></div>
            <div className="sob-eye-ball"></div>
          </div>
          <div className="sob-blush sob-blush-left"></div>
          <div className="sob-blush sob-blush-right"></div>
          <div className="sob-nose"></div>
          <div className="sob-mouth"></div>
        </div>
        <div className="sob-fin">
          <div className="sob-fin-inner sob-fin-inner-large"></div>
          <div className="sob-fin-inner sob-fin-inner-small"></div>
        </div>
        <div className="sob-arm sob-arm-left"></div>
        <div className="sob-arm sob-arm-right"></div>

        <div className="sob-body">
          <div className="sob-body-torso"></div>

          <div className="sob-leg sob-leg-left"></div>
          <div className="sob-leg sob-leg-right"></div>
        </div>
      </div>{" "}
    </div>
  );
};

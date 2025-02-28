import React from "react";

type TChildren = {
  children: React.ReactNode;
};

const Container = ({ children }: TChildren) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-2 py-20">{children}</div>
  );
};

export default Container;

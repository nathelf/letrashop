"use client";

type LayoutWrapperProps = {
  children: React.ReactNode;
};

/**
  * LayoutWrapper
  * 
  * This component is used to wrap the entire application.
  * 
  * It is used to provide a consistent layout across the entire application.
  * 
  * This component is rendered on the client side only.
  
  @param {React.ReactNode} children - The children to render.
*/
export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

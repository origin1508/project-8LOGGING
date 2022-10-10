import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BaseComponentType } from "@/types/common/baseComponentType";
import CustomErrorComponent from "@/components/errorBoundary/CustomErrorComponent";

// FallbackComponent, fallbackRender, fallback( 이건 권장하지 않는다고 하니까 패스 )
// 각각 정확히 뭐가 다른건지 잘 모르겠다
const CommonErrorBoundary = ({ children }: BaseComponentType) => {
  return (
    <ErrorBoundary FallbackComponent={CustomErrorComponent}>
      {children}
    </ErrorBoundary>
  );
};

export default CommonErrorBoundary;

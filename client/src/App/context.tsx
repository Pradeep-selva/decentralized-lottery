import React from "react";

interface ContextType {
  refetch: Function;
  manager: string;
  curUser: string;
}

const InfoContext = React.createContext<ContextType | undefined>(undefined);

export default InfoContext;

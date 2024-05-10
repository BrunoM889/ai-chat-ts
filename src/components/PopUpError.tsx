import React from "react";

function PopUpError({ msj }: { msj: string }): JSX.Element {
  return (
    <div className="fixed left-6 bottom-4 px-3 py-2 max-w-[250px] font-light bg-[#ff525be1] text-[#fffff] text-[14px] rounded max-[500px]:font-semibold max-[500px]:text-[12px] charge">
      <p>{msj}</p>
    </div>
  );
}

export default PopUpError;

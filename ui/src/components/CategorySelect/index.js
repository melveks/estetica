import React, { useEffect, useState } from "react";
import { Select } from "antd";
import _service from "@netuno/service-client";


function CategorySelect(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    _service({
      url: "/category/list",

      success: (response) => {
        if (response.json) {
          setList(response.json);
        }
      },
      fail: (e) => {
        console.log("Service Error", e);
      },
    });
  }, []);

  return (
    <div>
      {JSON.stringify(list)}
      <Select style={{ width: "500px" }} {...props}>
        {list.map((item) => {
          return <Select.Option value={item.codigo}>{item.nome}</Select.Option>;
        })}
      </Select>
    </div>
  );
}
export default CategorySelect;

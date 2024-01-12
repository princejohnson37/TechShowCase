import { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

// eslint-disable-next-line react/prop-types
const ShareModal = ({ visible, setVisible, projectId }) => {
  const [link, setLink] = useState(`http://localhost:5173/viewer/${projectId}/search?load=true`);
  const [code, setCode] = useState(projectId);
  const toast = useRef(null);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.current.show({
          severity: "success",
          summary: `${label} Copied`,
          detail: text,
          life: 3000,
        });
      },
      () => {
        // Handle copy error if needed
      }
    );
  };

  return (
    <div>
      <Toast ref={toast} />

      <Dialog
        header="Share"
        visible={visible}
        style={{
          width: "50vw",
          backgroundColor: "#121212 !important",
          display: "flex",
          flexDirection: "cloumn"
        }}
        onHide={() => setVisible(false)}
      >
        <div className="">
          <div className=""
            style={{
              marginBottom: '5%'
            }}
          >
            <InputText
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="p-inputtext-sm"
              style={{
                width:'80%'
              }}
            />
            <Button
              icon="pi pi-copy"
              onClick={() => copyToClipboard(link, "Link")}
              className="p-button-rounded p-button-success p-button-outlined p-ml-2"
              style={{
                height:'90%'
              }}
            />
          </div>
          <div className="">
            <InputText
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="p-inputtext-sm"
              style={{
                width:'80%'
              }}
            />
            <Button
              icon="pi pi-copy"
              onClick={() => copyToClipboard(code, "Code")}
              className="p-button-rounded p-button-success p-button-outlined p-ml-2"
              style={{
                height:'90%'
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ShareModal;

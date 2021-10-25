
import GlobalStyle from "./styles/global";
import { Container, Content } from "./styles";

import { Upload } from "./upload";
import { FileList } from "./fileList";
import { useState } from "react";
import { uniqueId } from "lodash";
import fileSize from "filesize";


function App() {

  const [uploadedFiles, setUploadedFiles] = useState([])

  function handleUpload(files) {
    const uploaded = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: fileSize(file.size),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }))

    setUploadedFiles(uploaded.concat(uploadedFiles))
  };

  return (
    <Container>
      <GlobalStyle />
      <Content>
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles && <FileList files={uploadedFiles} />}
      </Content>
    </Container>
  )
}

export default App;





// const [selectedFile, setSelectedFile] = useState(null)

//   function fileSelectHandler(e) {
//     setSelectedFile(e.target.files[0])
//   }

//   function fileUpdateHandler() {
//     const fd = new FormData();
//     fd.append("image", selectedFile, selectedFile.name);
//     axios.post("http://localhost:3000", fd, {
//       onUploadProgress: progressEvent => {
//         console.log("Upload Progress" + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%");
//       }
//     })
//       .then(res => {
//         console.log(res)
//       })
//   }

//   return (
//     <>
//       <input type="file" accept="image/png" size="100" onChange={fileSelectHandler} />
//       <button onClick={fileUpdateHandler}>upload</button>
//     </>
//   );

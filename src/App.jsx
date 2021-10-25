
import GlobalStyle from "./styles/global";
import { Container, Content } from "./styles";

import { Upload } from "./upload";
import { FileList } from "./fileList";
import { useState } from "react";
import { uniqueId } from "lodash";
import fileSize from "filesize";
import api from "./services/api";


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

    uploadedFiles.forEach(processUpload)
  };

  const updateFile = (id, data) => {
    setUploadedFiles(uploadedFiles.map(uploadedFile => {
      return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile;
    }))
  }

  const processUpload = uploadedFile => {
    const data = new FormData()

    data.append("file", uploadedFile.file, uploadedFile.name)

    api.post("posts", data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total))

        updateFile(uploadedFile.id, {
          progress
        })
      }
    })
  }

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

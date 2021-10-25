import { Container, FileInfo } from "./styles";
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink, MdUploadFile } from "react-icons/md";

export const FileList = ({ files }) => (
    <Container >
        {files.map(file => (
            <li key={file.id}>
                <FileInfo>
                    <div>
                        <strong>{file.name}</strong>
                        <span > {file.readableSize} <button onClick={() => { }}>Excluir</button></span>
                    </div>
                </FileInfo>

                <div>
                    {!file.uploaded && !file.error && (
                        <CircularProgressbar
                            styles={{
                                root: { width: 24 },
                                path: { stroke: "#7159c1" }
                            }}
                            strokeWidth={16}
                            value={file.progress}
                        />
                    )}
                    {file.url && (
                        <a
                            href="index.html"
                            target="_blank"
                        >
                            <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                        </a>
                    )}
                    {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
                    {file.error && <MdError size={24} color="#e57878" />}

                </div>

            </li>
        ))}
    </Container >
)

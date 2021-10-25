import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from "./styles"

export const Upload = ({onUpload}) => {

    const renderDragMessage = (isDragActive, isDragReject) => {
        if (!isDragActive) {
            return <UploadMessage> Arraste as imagens aqui...</UploadMessage>
        }

        if (isDragReject) {
            return <UploadMessage type="error"> Arquivo não suportado</UploadMessage>
        }

        return <UploadMessage type="success"> Solte os arquivos</UploadMessage>
    }

    return (
        <Dropzone accept="image/png" onDropAccepted={onUpload}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                <DropContainer
                    {...getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}
                >
                    <input {...getInputProps()} />
                    {renderDragMessage(isDragActive, isDragReject)}
                </DropContainer>
            )}
        </Dropzone>
    )
}
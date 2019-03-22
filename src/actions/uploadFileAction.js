import {
    UPLOAD_FILE
} from '../constants'

export const UploadFileAction = file => ({
    type: UPLOAD_FILE,
    file
});
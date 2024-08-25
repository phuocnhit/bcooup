// src/ckeditor-config.js
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';

export default {
    plugins: [CKFinder],
    toolbar: ['ckfinder', '|', 'imageUpload', '|', 'undo', 'redo'],
    ckfinder: {
        // CKFinder configuration options go here
        uploadUrl: 'YOUR_UPLOAD_URL',
    },
};

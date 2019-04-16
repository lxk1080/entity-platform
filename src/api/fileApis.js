import { postFile } from './common';

const FileApis = {
  /**
   * 上传富文本内的图片 file
   */
  uploadImage: data => postFile('/platform/uploadPlatformImage.do', '', data),
};

export default FileApis;

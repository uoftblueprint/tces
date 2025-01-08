import PropTypes from "prop-types";

export default function FileUploadButton({ onFileSelect }) {
  // ! Use the DropzoneArea from 'material-ui-dropzone'
  // ! Reference the CodeSandbox project.

  // ! Use prop drilling => Assume that the useState variable referencing the uploaded file is provided
  // ! as a prop
  console.log(onFileSelect);

  // ! Use the S3 bucket upload function to upload the resume file.
  // ! Need to correctly set the name of the file.
  // ! The file name should be: `${jobApplication.id}_${name}_${associatedJobPost.title}`,
  return <div>Placeholder</div>;
}

FileUploadButton.propTypes = {
  onFileSelect: PropTypes.func.isRequired, // Validate the prop
};

import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  withStateHandlers,
  withHandlers,
  withProps,
  defaultProps,
  pure
} from 'recompose';
import classnames from 'classnames';
import uuid from 'uuid/v4';
import { EntypoCross } from 'react-entypo';

import styles from './style.css';
import { RefsStore } from '../../utils';

const validateExtensions = (files, extensions) => {
  let valid = false;

  files.map(file =>
    extensions.map(extension => {
      if (file.type.includes(extension)) {
        valid = true;
      }
      return extension;
    })
  );
  return valid;
};

export const DropImage = ({
  dragOver,
  onDropImage,
  onDragOverImage,
  onDragLeaveImage,
  onUploadImage,
  files,
  name,
  removeImage,
  placeholder,
  refs,
  className,
  error,
  mode
}) => {
  const dropStyle = classnames({
    [styles.dropElement]: true,
    [styles.drapOver]: dragOver,
    [className]: className,
    [styles.dropWithError]: error,
    [styles.square]: mode === 'square'
  });

  return (
    <label
      className={dropStyle}
      htmlFor="imageUpload"
      onDrop={onDropImage}
      onDragOver={onDragOverImage}
      onDragLeave={onDragLeaveImage}
    >
      {files.map(item => (
        <div key={item.id} className={styles.dropImage}>
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              removeImage(item.id);
            }}
          >
            <EntypoCross />
          </button>
          <img src={item.image} alt={item.name} />
        </div>
      ))}
      <input
        type="file"
        ref={r => refs.store('file', r)}
        name={name}
        className={styles.inputFile}
        onChange={onUploadImage}
        id="imageUpload"
      />
      {!files.length && <span className={styles.dropText}>{placeholder}</span>}
    </label>
  );
};

DropImage.propTypes = {
  onDropImage: PropTypes.func,
  onDragOverImage: PropTypes.func,
  onDragLeaveImage: PropTypes.func,
  onUploadImage: PropTypes.func,
  formats: PropTypes.arrayOf(PropTypes.string),
  files: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      id: PropTypes.string
    })
  ),
  removeImage: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.bool,
  mode: PropTypes.oneOf(['square', 'circle'])
};

DropImage.defaultProps = {
  placeholder: 'Drop Image Here',
  mode: 'circle'
};

export default compose(
  defaultProps({
    formats: ['png', 'jpg', 'jpeg'],
    files: [],
    onChange: () => {}
  }),
  withProps({
    refs: RefsStore
  }),
  withStateHandlers(
    ({ error, files }) => ({ error: error, files: files, dragOver: false }),
    {
      setError: () => value => ({ error: value }),
      addFile: ({ files }, { onChange }) => file => {
        onChange([file]);
        return {
          files: [file]
        };
      },
      removeImage: ({ files }, { onChange }) => id => {
        onChange(files.filter(item => item.id !== id));
        return { files: files.filter(item => item.id !== id), error: false };
      },
      toggleDragOver: () => value => ({ dragOver: value })
    }
  ),
  withHandlers({
    onDragOverImage: ({ refs, toggleDragOver }) => event => {
      toggleDragOver(true);
      event.preventDefault();
    },
    onDragLeaveImage: ({ refs, toggleDragOver }) => event => {
      toggleDragOver(false);
      event.preventDefault();
    },
    onDropImage: ({
      maxItems,
      formats,
      setError,
      addFile,
      toggleDragOver
    }) => event => {
      let files = [];

      toggleDragOver(false);

      if (event.dataTransfer) {
        const dt = event.dataTransfer;

        if (dt.files && dt.files.length) {
          files = [...dt.files];
          const isValid = validateExtensions(files, formats);
          setError(!isValid);

          if (isValid) {
            const reader = new FileReader();
            reader.onload = file => {
              addFile({ image: file.target.result, id: uuid() });
            };
            reader.readAsDataURL(files[0]);
          }
        }
      }

      event.preventDefault();
    },
    onUploadImage: ({ formats, addFile, setError }) => event => {
      let files = [];

      if (event.target.files) {
        files = [...event.target.files];
        const isValid = validateExtensions(files, formats);
        setError(!isValid);

        if (isValid) {
          const reader = new FileReader();
          reader.onload = file => {
            addFile({ image: file.target.result, id: uuid() });
          };
          reader.readAsDataURL(files[0]);
        }
      }

      event.preventDefault();
    }
  }),
  pure
)(DropImage);

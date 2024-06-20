import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { Flex, Input, Tag, Button, theme, Tooltip } from "antd";

import { getTypes, deleteTypes, addTypes } from '../../toolkitReducers';
import { useDispatch, useSelector } from 'react-redux';

const tagInputStyle = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

const buttonStyle = {
  height: 22,
  width: 34,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

const EditTypes = forwardRef(({ isOpen, handleOk, isTypes }, ref) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    isAnyInputFocused: () => {
      const activeElement = document.activeElement;
      return activeElement.tagName === "INPUT" && activeElement.type === "text";
    },
  }));

  // console.log('props.isTypes', isTypes)
  useEffect(() => {
    if (isTypes) {
      console.log('>>> isTypes', isTypes)
      setTags(isTypes.map((type) => type.name))
      console.log('tags', tags)
    }
  }, [isTypes]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    if (editInputValue) {
      editInputRef.current?.focus();
    }
  }, [editInputValue]);

  const handleClose = (removedTag) => {
    const removedYear = isTypes?.filter((year) => year.name === removedTag)[0].id
    dispatch(deleteTypes(removedYear));

    setTimeout(() => {
      dispatch(getTypes());
    }, 500)
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {

    if (inputValue && !tags.includes(inputValue)) {
      // setTags([...tags, inputValue]);
      dispatch(addTypes(inputValue));
      setTimeout(() => {
        dispatch(getTypes());
      }, 500)
    }

    
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const tagPlusStyle = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <Flex gap="4px 0" wrap>
      {tags.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={index}
              size="small"
              style={tagInputStyle}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag?.length && tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            closable={true}
            style={{
              background: token.colorBgContainer,
              userSelect: "none",
            }}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );

        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <>
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={tagInputStyle}
            value={inputValue}
            onChange={handleInputChange}
            // onBlur={handleInputConfirm}
            // onPressEnter={handleInputConfirm}
          />
          <Button
            type="primary"
            size="small"
            style={buttonStyle}
            onClick={handleInputConfirm}
          >
            <CheckOutlined />
          </Button>
        </>
      ) : (
        <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
          Додати
        </Tag>
      )}
    </Flex>
  );
});

export default EditTypes;

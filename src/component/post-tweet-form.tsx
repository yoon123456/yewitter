import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #07a2e8;
  }
`;
export const AttachFileBtn = styled.label`
  padding: 10px 0px;
  color: #07a2e8;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #07a2e8;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.7;
  }
`;

export const Thumnail = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin: 0 auto;
`;
export const AttachInput = styled.input`
  display: none;
`;
export const SubmitBtn = styled.input`
  background-color: #07a2e8;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

const PostTweetForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [thum, setThum] = useState<string | ArrayBuffer | null>("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
      encodeFileToBase64(files[0]);
    }
  };

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setThum(reader.result);
        resolve();
      };
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (isLoading || tweet === "" || tweet.length > 180) return;

    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "tweet"), {
        tweet,
        createdAt: Date.now(),
        userName: user?.displayName || "Annoymous",
        userId: user?.uid,
      });
      if (file) {
        const maxSize = 1 * 1024 * 1024;
        const fileSize = file.size;

        if (fileSize > maxSize) {
          alert("This image is too big!");
          return;
        }
        const locationRef = ref(
          storage,
          `tweets/${user?.uid}-${user?.displayName}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setThum("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?"
      />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {thum && <Thumnail src={thum} alt="preview-img" />}
      <AttachFileBtn htmlFor="file">
        {file ? "Photo added✅" : "Add photo"}
      </AttachFileBtn>

      <AttachInput
        onChange={onFileChange}
        id="file"
        type="file"
        accept="image/*"
      />
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post tweet"}
      />
    </Form>
  );
};

export default PostTweetForm;

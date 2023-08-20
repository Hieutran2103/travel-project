import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import customFetch from "../../utils/url";
import "./albumDetail.scss";
import { useQuery } from "@tanstack/react-query";

function AlbumDetail() {
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const apiUrlAlbumDetail = `/albums/${id}`;

  const fetchAlbumDetail = async () => {
    try {
      const response = await customFetch.get(apiUrlAlbumDetail);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching album data");
    }
  };

  const {
    data: albumDataDetail,
    isLoading: isAlbumDetailLoading,
    isError: isAlbumDetailError,
  } = useQuery(["albumDataDetail", apiUrlAlbumDetail], fetchAlbumDetail);

  if (isAlbumDetailLoading) {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (isAlbumDetailError) {
    return <div>Error</div>;
  }

  const mediaItems = albumDataDetail.data.medias;

  return (
    <div className="albumDetail">
      <ImageList cols={3} rowHeight={250}>
        {mediaItems.map((item, index) => (
          <ImageListItem key={index} className="imageList">
            <img
              src={item.url}
              alt={`Media ${index}`}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onClick={() => openModal(item)}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div style={{ outline: "none" }}>
        <Modal
          open={modalOpen}
          onClose={closeModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          disableAutoFocus={true}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "1300px",
            }}
          >
            {selectedImage && (
              <div
                style={{
                  display: "flex",
                }}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  loading="lazy"
                  style={{
                    width: "910px",
                    height: "700px",
                    flex: "1",
                    objectFit: "contain",
                    margin: "auto",
                    // backgroundColor: "black",
                  }}
                />
              </div>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default AlbumDetail;

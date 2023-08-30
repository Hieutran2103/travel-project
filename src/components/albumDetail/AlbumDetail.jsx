import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import customFetch from "../../utils/url";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import {styled, alpha} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {toast} from "react-toastify";
import {ToastContainer} from "react-toastify";
import {useGlobalContextAuth} from "../../context/AuthContext";
import "./albumDetail.scss";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({theme}) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function AlbumDetail() {
  const {currentUser} = useGlobalContextAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const url = window.location.pathname.split("/");
  const albumId = url[url.length - 1];
  const userID = currentUser.id;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const apiUrlAlbumDetail = `/albums/${albumId}`;

  const fetchAlbumDetail = async () => {
    try {
      const response = await customFetch.get(apiUrlAlbumDetail);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching album data");
    }
  };

  const {mutate: deleteAlbumMutation} = useMutation({
    mutationFn: (album) => customFetch.delete(apiUrlAlbumDetail, album),
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["albumsNF"]});
      toast.success("Successfully deleted album");
      setTimeout(() => {
        navigate(`/profile/${userID}/albums`);
      }, 1000);
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error");
    },
  });

  const {
    data: albumDataDetail,
    isLoading: isAlbumDetailLoading,
    isError: isAlbumDetailError,
  } = useQuery(["albumDataDetail", apiUrlAlbumDetail], fetchAlbumDetail);

  if (isAlbumDetailLoading) {
    return;
  }

  if (isAlbumDetailError) {
    return;
  }

  const mediaItems = albumDataDetail.data.medias;
  const mediaName = albumDataDetail.data.album_name;

  const handleDelete = () => {
    deleteAlbumMutation();
  };

  return (
    <div className="albumDetail">
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        autoClose={3000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px",
          fontWeight: 600,
        }}
      >
        <div
          style={{
            fontSize: "30px",
          }}
        >
          {mediaName}
        </div>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            backgroundColor: "#EFEFEF",
            color: "black",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#d6d6d6",
            },
          }}
        >
          Action
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <EditIcon />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDelete();
              handleClose();
            }}
            disableRipple
          >
            <DeleteIcon />
            Delete
          </MenuItem>
        </StyledMenu>
      </div>
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
      <div style={{outline: "none"}}>
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
                    backgroundColor: "black",
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

import useSinglePostContext from "./useSinglePostContext";
export function useFetchSinglePost() {
  const { dispatch, setLoadingPost } = useSinglePostContext();
  const fetchPostData = async (item) => {
    if (item !== null) {
      let copy = item;

      // fetching post imgs
      copy.postUrls = [];
      if (!(!copy.postImgs || copy.postImgs.length === 0)) {
        setLoadingPost(true);
        let images = await Promise.all(
          copy.postImgs.map(async (postImg) => {
            const img = await fetch(
              `http://localhost:4000/api/img/getImgPublic/${postImg}`
            );

            const blob = await img.blob();
            const imgURL = URL.createObjectURL(blob);
            return imgURL;
          })
        );
        copy.postUrls = images;
      }

      if (!item.imgName) {
        setLoadingPost(false);
        return dispatch({ type: "setSinglePost", payload: item });
      } else {
        //fetching profil img
        const res = await fetch(
          `http://localhost:4000/api/img/getImgPublic/${item.imgName}`
        );
        const blob = await res.blob();
        const imgURL = URL.createObjectURL(blob);
        copy.profilImg = imgURL;
        setLoadingPost(false);
        dispatch({ type: "setSinglePost", payload: copy });
      }
    } else {
      return;
    }
    dispatch({ type: "setSinglePost", payload: item });
  };
  return [fetchPostData];
}

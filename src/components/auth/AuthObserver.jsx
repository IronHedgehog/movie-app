import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../store/services/firebase";
import { setUser } from "../../store/slices/userSlice";
import { fetchFavorites } from "../../store/thunks/userThunks";

const AuthObserver = ({ children }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.user.isLoading);
  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (isLoadingRef.current) {
        return;
      }

      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
          }),
        );

        // НОВЕ: Як тільки юзер авторизований, тягнемо його фільми з бази!
        dispatch(fetchFavorites(firebaseUser.uid));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
};

export default AuthObserver;

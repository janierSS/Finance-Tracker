import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  succes: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {isPending: true, document: null, succes: false, error: null}
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, succes: true, error: null }
      case 'DELETED_DOCUMENT':
        return { isPending: false, document: null, succes: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, succes: false, error: action.payload }
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispatchIsNotCancelled = (action) => {
    if(!isCancelled){
      dispatch(action)
    }
  }

  //add document
  const addDocument = async (doc) => {
    dispatch({type: 'IS_PENDING'})
    try{
      const createAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createAt })
      dispatchIsNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument})
    }catch (err){
      dispatchIsNotCancelled({ type: 'ERROR', payload: err.message })
    }
  };


  // delete document
  const deleteDocument = async (id) => {
    dispatch({type: 'IS_PENDING'})
    try{
      await ref.doc(id).delete()
      dispatchIsNotCancelled({type: 'DELETED_DOCUMENT'})   
    }catch (err){
      dispatchIsNotCancelled({ type: 'ERROR', payload: "could not delete" })
    }
  };

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};

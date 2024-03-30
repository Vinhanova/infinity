import { doc, updateDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'

const deleteAssetFS = async (dbCollection: string, userId: string, assetToDelete: string) => {
  const assetRef = doc(db, dbCollection, userId)

  // Remove assetToDelete field from the document
  await updateDoc(assetRef, {
    [assetToDelete]: deleteField()
  }).catch(() => alert('Erro ao eliminar ativo'))
}

export default deleteAssetFS

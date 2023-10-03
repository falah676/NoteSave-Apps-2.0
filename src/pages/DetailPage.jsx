import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DetailBody from "../Component/DetailBody";
import { DetailButton } from "../Component/FloatingButton";
import LoadingBar from "../Component/LoadingBar";
import { getNote } from "../utils/network-data";

const DetailPage = () => {
    const id = useParams().id
    const [noteData, setNoteData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await getNote(id);
              setNoteData(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, [id]);
      if (!noteData) {
        return <LoadingBar />;
      }
        return (
            <section className="detail-page">
                <DetailBody data={noteData}/>
                <DetailButton isArchive={noteData.archived} id={noteData.id}/>
            </section>
        )
}

export default DetailPage;
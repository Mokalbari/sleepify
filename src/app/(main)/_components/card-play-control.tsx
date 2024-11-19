"use client"

import { useAudio } from "@/context/audio-context"
import { usePlaylistContext } from "@/context/playlist-context"
import { TrackList } from "@/lib/types/definitions"
import { Bug, Pause, Play } from "lucide-react"
import HeartButton from "../../../components/ui/heart-button"

type Props = TrackList

export default function CardPlayControl({
  music_url: trackUrl,
  is_favorite: isFavorite,
  track_id: trackId,
}: Props) {
  const {
    currentTrack,
    isPlaying,
    setAudioTrack,
    togglePlayPause,
    setCurrentPlaylist,
    setCurrentTrackIndex,
  } = useAudio()

  const { playlist } = usePlaylistContext()

  const handlePlayPause = () => {
    if (!trackUrl) return

    // Vérifiez si la piste cliquée est différente de la piste actuelle
    if (currentTrack?.trackUrl !== trackUrl) {
      // Convertir TrackList[] en AudioTrack[]
      const audioPlaylist = playlist.map((track) => ({
        trackId: track.track_id,
        trackUrl: track.music_url,
        trackName: track.track_name,
        // Convertir artist_name en tableau si nécessaire
        artistName: Array.isArray(track.artist_name)
          ? track.artist_name
          : [track.artist_name],
        previewImage: track.track_image,
      }))

      // Trouver l'index de la piste actuelle dans la playlist
      const index = audioPlaylist.findIndex(
        (track) => track.trackId === trackId,
      )

      // Vérifier si l'index a été trouvé
      if (index !== -1) {
        // Créer l'objet AudioTrack pour la piste actuelle
        const audioTrack = audioPlaylist[index]

        // Mettre à jour la playlist actuelle et l'index de la piste
        setCurrentPlaylist(audioPlaylist)
        setCurrentTrackIndex(index)
        setAudioTrack(audioTrack)
      } else {
        // Gérer le cas où la piste n'est pas trouvée
        console.error("La piste n'a pas été trouvée dans la playlist.")
      }
    } else {
      // Basculer entre lecture et pause si la même piste est cliquée
      togglePlayPause()
    }
  }

  return (
    <div className="flex gap-4">
      <HeartButton isFavorite={isFavorite} trackId={trackId} />
      <button
        onClick={handlePlayPause}
        disabled={!trackUrl}
        className={`flex items-center justify-center ${
          !trackUrl ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {trackUrl === null ? (
          <Bug />
        ) : isPlaying && currentTrack?.trackUrl === trackUrl ? (
          <Pause />
        ) : (
          <Play />
        )}
      </button>
    </div>
  )
}

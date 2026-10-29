import { artists as realArtists } from "./artists";
import { tracks as realTracks } from "./tracks";
import { projects as realProjects } from "./projects";
import { sampleArtists, sampleProjects, sampleTracks } from "./sample";

const useSample = process.env.FWM_SAMPLE_CONTENT === "1";

export const artists = (useSample ? sampleArtists : realArtists).filter((a) => a.published);
export const tracks = (useSample ? sampleTracks : realTracks).filter((t) => t.published);
export const projects = (useSample ? sampleProjects : realProjects).filter((p) => p.published);

export const getArtist = (slug: string) => artists.find((a) => a.slug === slug);
export const getArtistTracks = (artistId: string) => tracks.filter((t) => t.artistId === artistId);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredArtists = () => artists.filter((a) => a.featured);
export const featuredProjects = () => projects.filter((p) => p.featured);

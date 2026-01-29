import { formatLiveDuration } from "@/lib/utils/format-live-duration";
import type { StreamerData, TwitchStream, TwitchVideo, VideoData } from "./types";

export class Streamer {
  readonly id: string;
  readonly username: string;
  readonly displayName: string;
  readonly twitchUrl: string;
  readonly thumbnailUrl: string;
  readonly streamTitle: string;
  readonly gameName: string;
  readonly startedAt: string;
  readonly liveDuration: string;
  readonly viewerCount: number;

  constructor(data: StreamerData) {
    this.id = data.id;
    this.username = data.username;
    this.displayName = data.displayName;
    this.twitchUrl = data.twitchUrl;
    this.thumbnailUrl = data.thumbnailUrl;
    this.streamTitle = data.streamTitle;
    this.gameName = data.gameName;
    this.startedAt = data.startedAt;
    this.liveDuration = data.liveDuration;
    this.viewerCount = data.viewerCount;
  }

  static fromTwitchStream(stream: TwitchStream): Streamer {
    return new Streamer({
      id: stream.user_id,
      username: stream.user_login,
      displayName: stream.user_name,
      twitchUrl: `https://twitch.tv/${stream.user_login}`,
      thumbnailUrl: stream.thumbnail_url.replace("{width}", "1280").replace("{height}", "720"),
      streamTitle: stream.title,
      gameName: stream.game_name,
      startedAt: stream.started_at,
      liveDuration: formatLiveDuration(stream.started_at),
      viewerCount: stream.viewer_count,
    });
  }

  /**
   * Convert to a plain object for RSC/JSON serialization.
   */
  toData(): StreamerData {
    return {
      id: this.id,
      username: this.username,
      displayName: this.displayName,
      twitchUrl: this.twitchUrl,
      thumbnailUrl: this.thumbnailUrl,
      streamTitle: this.streamTitle,
      gameName: this.gameName,
      startedAt: this.startedAt,
      liveDuration: this.liveDuration,
      viewerCount: this.viewerCount,
    };
  }
}

export class Vod {
  readonly id: string;
  readonly username: string;
  readonly displayName: string;
  readonly title: string;
  readonly thumbnailUrl: string;
  readonly url: string;
  readonly viewCount: number;
  readonly createdAt: string;
  readonly duration: string;

  constructor(data: VideoData) {
    this.id = data.id;
    this.username = data.username;
    this.displayName = data.displayName;
    this.title = data.title;
    this.thumbnailUrl = data.thumbnailUrl;
    this.url = data.url;
    this.viewCount = data.viewCount;
    this.createdAt = data.createdAt;
    this.duration = data.duration;
  }

  static fromTwitchVideo(video: TwitchVideo): Vod {
    return new Vod({
      id: video.id,
      username: video.user_login,
      displayName: video.user_name,
      title: video.title,
      thumbnailUrl: video.thumbnail_url.replace("%{width}", "1280").replace("%{height}", "720"),
      url: video.url,
      viewCount: video.view_count,
      createdAt: video.created_at,
      duration: video.duration,
    });
  }

  /**
   * Convert to a plain object for RSC/JSON serialization.
   */
  toData(): VideoData {
    return {
      id: this.id,
      username: this.username,
      displayName: this.displayName,
      title: this.title,
      thumbnailUrl: this.thumbnailUrl,
      url: this.url,
      viewCount: this.viewCount,
      createdAt: this.createdAt,
      duration: this.duration,
    };
  }
}


export interface DbPeer {
  key: string;
  discovery_key: string;
  model_name: string;
  public?: boolean;
  server_key?: string;
  data_collection_enabled: boolean;
  max_connections: number;
  connections?: number;
  created_at: Date;
  name: string;
  website: string;
  online?: boolean;
  updated_at: Date;
  provider: string;
  connected_since: Date | null;
  points?: number;
}

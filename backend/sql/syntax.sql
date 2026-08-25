CREATE TABLE aegs (
                      id INT PRIMARY KEY,
                      short_name TEXT NOT NULL,
                      object_class TEXT NOT NULL,
                      description TEXT NOT NULL,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ranks (
                       id SERIAL PRIMARY KEY,
                       name TEXT NOT NULL
);

DROP TABLE IF EXISTS aeg_rank_access;

CREATE TABLE aeg_rank_access (
                                 entry_id INT NOT NULL REFERENCES aegs(id) ON DELETE CASCADE,
                                 rank_id INT NOT NULL REFERENCES ranks(id) ON DELETE CASCADE,
                                 access_tier INT NOT NULL DEFAULT 0,
                                 PRIMARY KEY (entry_id, rank_id)
);

CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username TEXT NOT NULL UNIQUE,
                       player_uuid UUID NOT NULL UNIQUE,
                       password_hash TEXT NOT NULL,
                       rank_id INT NOT NULL REFERENCES ranks(id) ON DELETE CASCADE
);

CREATE TABLE char_sheets (
                             id SERIAL PRIMARY KEY,
                             user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                             name TEXT NOT NULL,
                             description TEXT NOT NULL,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE char_sheet_rank_access (
                                        rank_id INT NOT NULL REFERENCES ranks(id) ON DELETE CASCADE,
                                        char_sheet_id INT NOT NULL REFERENCES char_sheets(id) ON DELETE CASCADE,
                                        hard_restrict BOOLEAN NOT NULL DEFAULT TRUE,
                                        PRIMARY KEY (rank_id, char_sheet_id)
);
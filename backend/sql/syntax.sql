SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS aegs, ranks, aeg_rank_access, users, char_sheets, char_sheet_rank_access, registration_junction;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE aegs (
                      id INT PRIMARY KEY,
                      short_name TEXT NOT NULL,
                      object_class TEXT NOT NULL,
                      description TEXT NOT NULL,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ranks (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name TEXT NOT NULL
);

CREATE TABLE aeg_rank_access (
                                 entry_id INT NOT NULL,
                                 rank_id INT NOT NULL,
                                 access_tier INT NOT NULL DEFAULT 0,
                                 PRIMARY KEY (entry_id, rank_id),
                                 FOREIGN KEY (entry_id) REFERENCES aegs(id) ON DELETE CASCADE,
                                 FOREIGN KEY (rank_id) REFERENCES ranks(id) ON DELETE CASCADE
);

CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       username TEXT NOT NULL UNIQUE,
                       player_uuid CHAR(36) UNIQUE,
                       password_hash TEXT NOT NULL,
                       rank_id INT,
                       FOREIGN KEY (rank_id) REFERENCES ranks(id) ON DELETE CASCADE
);

CREATE TABLE char_sheets (
                             id INT AUTO_INCREMENT PRIMARY KEY,
                             user_id INT NOT NULL,
                             name TEXT NOT NULL,
                             description TEXT NOT NULL,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE char_sheet_rank_access (
                                        rank_id INT NOT NULL,
                                        char_sheet_id INT NOT NULL,
                                        hard_restrict BOOLEAN NOT NULL DEFAULT TRUE,
                                        PRIMARY KEY (rank_id, char_sheet_id),
                                        FOREIGN KEY (rank_id) REFERENCES ranks(id) ON DELETE CASCADE,
                                        FOREIGN KEY (char_sheet_id) REFERENCES char_sheets(id) ON DELETE CASCADE
);

CREATE TABLE registration_junction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_username TEXT NOT NULL,
    player_uuid CHAR(36) NOT NULL,
    url_uuid CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    UNIQUE (player_username, player_uuid)
)
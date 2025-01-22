-- auto-generated definition
create table company
(
    co_idx     int auto_increment comment '회사 키 값'
        primary key,
    co_name    varchar(255)                          not null comment '회사 이름',
    created_at timestamp default current_timestamp() null,
    updated_at timestamp default current_timestamp() null on update current_timestamp(),
    constraint co_name
        unique (co_name)
);

-- auto-generated definition
create table course_reservation
(
    cr_idx          int auto_increment comment '노선별 셔틀 예약건'
        primary key,
    course_idx      int                                   not null comment '셔틀 코스',
    reservation_idx int                                   not null comment '예약',
    cr_seq          int                                   null comment '동선 순서',
    created_at      timestamp default current_timestamp() null,
    updated_at      timestamp default current_timestamp() null on update current_timestamp(),
    constraint course_reservation_index_0
        unique (course_idx, cr_seq)
);

-- auto-generated definition
create table reservation_enrollment
(
    re_idx          int auto_increment comment '셔틀 예약별 등록 수업'
        primary key,
    reservation_idx int                                   not null,
    enrollment_idx  int                                   not null,
    created_at      timestamp default current_timestamp() null,
    updated_at      timestamp default current_timestamp() null on update current_timestamp()
);

-- auto-generated definition
create table shuttle
(
    sh_idx     int auto_increment comment '셔틀 정보 키 값'
        primary key,
    sh_name    varchar(255)                          not null comment '셔틀 이름 ex 1호차',
    driver_idx int                                   not null comment 'user table에서 driver인 사람의 idx',
    sh_state   tinyint                               not null comment '0:대기, 1:운행중, 2:삭제 ',
    sh_max_cnt int                                   not null comment '셔틀 최대 인원',
    created_at timestamp default current_timestamp() null,
    updated_at timestamp default current_timestamp() null on update current_timestamp()
);

-- auto-generated definition
create table shuttle_area
(
    sa_idx      int auto_increment comment '셔틀 운행 지역'
        primary key,
    shuttle_idx int                                   not null comment '셔틀 키 값',
    area_idx    int                                   not null comment '지역 키 값',
    created_at  timestamp default current_timestamp() null,
    updated_at  timestamp default current_timestamp() null on update current_timestamp()
);

-- auto-generated definition
create table shuttle_course
(
    sc_idx       int auto_increment comment '셔틀 코스'
        primary key,
    shuttle_idx  int                                   not null comment '셔틀 키 값',
    sc_arrive_at datetime                              not null comment '셔틀 도착 시작',
    created_at   timestamp default current_timestamp() null,
    updated_at   timestamp default current_timestamp() null on update current_timestamp()
);

-- auto-generated definition
create table shuttle_reservation
(
    sr_idx           int auto_increment comment '셔틀 예약'
        primary key,
    shuttle_idx      int                                   not null comment '셔틀 idx',
    shuttle_time_idx int                                   not null comment '셔틀 시간 idx',
    student_idx      int                                   not null comment '학생 idx',
    sr_address       varchar(255)                          not null comment '수강생 접선 주소',
    sr_address_memo  varchar(255)                          null comment '수강생 접선 주소 상세',
    sr_address_x     decimal(9, 6)                         not null comment '접선 주소 x좌표',
    sr_address_y     decimal(9, 6)                         not null comment '접선 주소 y좌표',
    sr_state         tinyint                               not null comment '0:대기 1:출석 2:노쇼',
    created_at       timestamp default current_timestamp() null,
    updated_at       timestamp default current_timestamp() null on update current_timestamp()
);

-- auto-generated definition
create table shuttle_time
(
    st_idx      int auto_increment comment '셔틀 운행 시간'
        primary key,
    st_time     time                                  not null,
    company_idx int                                   not null,
    created_at  timestamp default current_timestamp() null,
    updated_at  timestamp default current_timestamp() null on update current_timestamp()
);

-- auto-generated definition
create table student
(
    st_idx       int auto_increment comment '수강생'
        primary key,
    company_idx  int                                   not null comment '소속 학원',
    area_idx     int                                   not null comment '지역',
    st_name      varchar(255)                          not null comment '수강생 이름',
    st_contact   varchar(255)                          not null comment '수강생 핸드폰 번호',
    st_address   varchar(255)                          not null comment '수강생 집 주소',
    st_address_x decimal(9, 6)                         not null comment '집 주소 x좌표',
    st_address_y decimal(9, 6)                         not null comment '집 주소 y좌표',
    created_at   timestamp default current_timestamp() null,
    updated_at   timestamp default current_timestamp() null on update current_timestamp()
);

-- auto-generated definition
create table user
(
    us_idx      int auto_increment comment 'user 키 값'
        primary key,
    us_id       varchar(255)                          not null comment 'user 아이디',
    us_password varchar(255)                          not null comment 'user 비밀번호',
    us_level    enum ('manager', 'driver')            null,
    company_idx int                                   not null comment '소속 회사 idx',
    us_contact  varchar(255)                          not null,
    us_name     varchar(255)                          not null,
    created_at  timestamp default current_timestamp() null,
    updated_at  timestamp default current_timestamp() null on update current_timestamp(),
    constraint us_id
        unique (us_id)
);


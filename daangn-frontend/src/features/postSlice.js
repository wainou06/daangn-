import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 게시물 등록

// 전체 게시물 가져오기

// 특정 게시물 가져오기

// 게시물 수정

// 게시물 삭제

const postSlice = createSlice({
   name: 'posts',
   initialState: {
      post: null, // 게시글 데이터
      posts: [], // 게시글 리스트
      pagination: null, // 페이징 객체
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
    }
})
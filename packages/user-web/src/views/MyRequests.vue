<template>
  <div class="requests-page">
    <Header />
    <main class="profile-page-shell">
      <ProfileSidebar />

      <section class="profile-page-content requests-content">
        <div class="requests-toolbar">
          <h1>My Requests</h1>
          <div class="toolbar-actions">
            <select v-model="state筛选" aria-label="筛选 by state"><option>全部 states</option><option>Completed</option><option>Pending order</option><option>Cancelled</option></select>
            <select v-model="sortBy" aria-label="Sort requests"><option value="latest">latest</option><option value="oldest">oldest</option></select>
            <router-link to="/post-demand" class="post-button"><i class="bi bi-plus-lg"></i> Post Request</router-link>
          </div>
        </div>

        <div class="request-list">
          <article v-for="request in filteredRequests" :key="request.id" class="request-card">
            <div class="request-card-top">
              <h2>{{ request.title }}</h2>
              <span :class="['request-status', request.statusClass]">{{ request.status }}</span>
            </div>
            <p class="request-meta">Posted: {{ request.posted }} | Budget: {{ request.budget }} | Construction time: {{ request.construction }}</p>
            <p class="request-description">{{ request.description }}</p>
            <div class="request-tags"><span v-for="tag in request.tags" :key="tag">{{ tag }}</span></div>
            <div v-if="request.images.length" class="request-images">
              <img v-for="image in request.images" :key="image" :src="image" alt="Request reference" loading="lazy" />
            </div>
            <div class="request-footer">
              <div class="designer-info">Designer: <span v-if="request.designer"><img :src="request.designerAvatar" alt="" />{{ request.designer }}</span><span v-else>Awaiting designer match...</span></div>
              <div class="request-actions"><router-link :to="'/profile/requests/' + request.id">View Request Details</router-link><template v-if="request.designer"><a href="#" @click.prevent>View Design</a><a href="#" @click.prevent>Buy Construction Services</a></template><template v-else><a href="#" @click.prevent>Edit</a><a href="#" @click.prevent>Cancel Request</a></template></div>
            </div>
          </article>
        </div>

        <div class="pagination"><span>共50条</span><button>‹</button><button class="current">1</button><button>2</button><button>3</button><button>4</button><button>5</button><span>...</span><button>20</button><button>›</button></div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ProfileSidebar from '@/components/ProfileSidebar.vue'

const state筛选 = ref('全部 states')
const sortBy = ref('latest')
const images = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300&h=120&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=300&h=120&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&h=120&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=120&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=120&fit=crop&q=80'
]
const requests = [
  { id: 1, title: 'Modern Sofa for Small Living Room', status: 'Completed', statusClass: 'completed', posted: 'May 15, 2026', budget: '$1,000-$2,500', construction: 'June 15, 2026', description: "I'm looking for a modern sofa less than 72 inches for my small living room. I prefer neutral colors (gray/beige). The fabric should be pet-friendly. The sofa frame must be solid wood.", tags: ['Modern', 'Minimalist', 'Nordic'], images, designer: 'Nancy', designerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nancy' },
  { id: 2, title: 'Modern Sofa for Small Living Room', status: 'Pending order', statusClass: 'pending', posted: 'May 15, 2026', budget: '$1,000-$2,500', construction: 'June 15, 2026', description: "I'm looking for a modern sofa less than 72 inches for my small living room. I prefer neutral colors (gray/beige). The fabric should be pet-friendly. The sofa frame must be solid wood.", tags: ['Modern', 'Minimalist', 'Nordic'], images: images.slice(2, 4), designer: '' },
  { id: 3, title: 'Modern Sofa for Small Living Room', status: 'Cancelled', statusClass: 'cancelled', posted: 'May 15, 2026', budget: '$1,000-$2,500', construction: 'June 15, 2026', description: "I'm looking for a modern sofa less than 72 inches for my small living room. I prefer neutral colors (gray/beige). The fabric should be pet-friendly. The sofa frame must be solid wood.", tags: ['Modern', 'Minimalist', 'Nordic'], images: images.slice(1, 2), designer: 'Nancy', designerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nancy' },
  { id: 4, title: 'Modern Sofa for Small Living Room', status: 'Pending order', statusClass: 'pending', posted: 'May 15, 2026', budget: '$1,000-$2,500', construction: 'June 15, 2026', description: "I'm looking for a modern sofa less than 72 inches for my small living room. I prefer neutral colors (gray/beige). The sofa frame must be solid wood.", tags: ['Modern', 'Minimalist', 'Nordic'], images: [], designer: '' },
  { id: 5, title: 'Modern Sofa for Small Living Room', status: 'Pending order', statusClass: 'pending', posted: 'May 15, 2026', budget: '$1,000-$2,500', construction: 'June 15, 2026', description: "I'm looking for a modern sofa less than 72 inches for my small living room. I prefer neutral colors (gray/beige). The fabric should be pet-friendly. The sofa frame must be solid wood.", tags: ['Modern', 'Minimalist', 'Nordic'], images: images.slice(3, 5), designer: '' }
]
const filteredRequests = computed(() => state筛选.value === '全部 states' ? requests : requests.filter(item => item.status === state筛选.value))
</script>

<style scoped>
.requests-page{min-height:100vh;background:#f4f4f5;color:#30343a;font-family:Arial,Helvetica,sans-serif}
.requests-shell{display:flex;width:100%;min-height:calc(100vh - 135px);background:#f4f4f5}.account-sidebar{flex:0 0 192px;width:192px;background:#fff;border-right:1px solid #e7e9ed;padding:15px 7px}.profile-user{text-align:center;padding-bottom:14px}.profile-avatar{width:66px;height:66px;display:block;margin:auto;border-radius:50%;border:2px solid #d7e4f2}.profile-user h1{margin:4px 0 4px;font-size:20px}.profile-user p{margin:0 0 5px;color:#666;font-size:12px}.profile-nav{display:flex;flex-direction:column;gap:2px}.sidebar-link{display:flex;align-items:center;gap:13px;min-height:34px;padding:0 11px;border-radius:4px;color:#333;text-decoration:none;font-size:12px}.sidebar-link i{width:13px;text-align:center}.sidebar-link.active{background:#edf7fc;color:#0078b8;font-weight:600}.sidebar-link:hover{background:#f5f9fb;color:#0078b8}
.requests-content{flex:1;min-width:0;padding:12px 10px 14px}.requests-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:11px}.requests-toolbar h1{margin:0;font-size:25px;line-height:30px}.toolbar-actions{display:flex;align-items:center;gap:13px}.toolbar-actions select{height:29px;min-width:99px;padding:0 10px;border:1px solid #444;border-radius:4px;background:#fff;color:#444;font-size:12px}.post-button{height:29px;display:inline-flex;align-items:center;gap:7px;padding:0 14px;border-radius:4px;background:#0878b0;color:#fff;font-size:12px;text-decoration:none}.post-button:hover{background:#056596}.request-list{display:flex;flex-direction:column;gap:12px}.request-card{padding:12px 13px 0;background:#fff;border:1px solid #e2e5e9;border-radius:4px}.request-card-top{display:flex;align-items:center;justify-content:space-between}.request-card h2{margin:0;font-size:15px;line-height:21px}.request-status{padding:3px 8px;font-size:12px;line-height:16px;border-radius:2px}.request-status.completed{color:#00a63c;background:#eaffef}.request-status.pending{color:#1268e8;background:#eaf3ff}.request-status.cancelled{color:#42464d;background:#f0f1f3}.request-meta,.request-description{margin:7px 0 0;color:#666;font-size:12px;line-height:18px}.request-description{margin-top:5px}.request-tags{display:flex;gap:8px;margin-top:7px}.request-tags span{padding:4px 8px;border:1px solid #dfe3e8;border-radius:3px;background:#f6f7f8;font-size:12px}.request-images{display:flex;gap:7px;margin-top:7px;overflow:hidden}.request-images img{flex:0 0 174px;width:174px;height:70px;object-fit:cover;border-radius:3px}.request-footer{display:flex;align-items:center;justify-content:space-between;min-height:55px;margin-top:12px;border-top:1px solid #e4e7eb}.designer-info{color:#666;font-size:12px}.designer-info span{display:inline-flex;align-items:center;gap:7px;margin-left:7px;color:#333}.designer-info img{width:22px;height:22px;border-radius:50%}.request-actions{display:flex;gap:14px}.request-actions a{color:#0078b8;font-size:12px;text-decoration:none}.request-actions a:hover{text-decoration:underline}.pagination{display:flex;align-items:center;justify-content:flex-end;gap:13px;margin-top:15px;color:#444;font-size:12px}.pagination button{min-width:26px;height:28px;border:0;background:transparent;color:#555;border-radius:2px}.pagination button.current{border:1px solid #0078b8;color:#0078b8;background:#fff}.requests-page :deep(.site-footer){min-height:73px}.requests-page :deep(.site-footer .container-fluid){padding-top:22px!important;padding-bottom:22px!important}
@media(max-width:900px){.requests-shell{flex-direction:column}.account-sidebar{width:100%;flex-basis:auto;padding:8px 12px}.profile-user{display:none}.profile-nav{flex-direction:row;overflow-x:auto}.sidebar-link{flex:0 0 auto}.requests-content{padding:18px 12px 30px}.requests-toolbar{align-items:flex-start;flex-direction:column;gap:12px}.toolbar-actions{flex-wrap:wrap}.request-footer{align-items:flex-start;flex-direction:column;gap:10px;padding:10px 0}.request-actions{flex-wrap:wrap}.pagination{justify-content:center}}
</style>

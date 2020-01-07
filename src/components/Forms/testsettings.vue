<template>
  <div class="row justify-between items-start content-center q-gutter-y-md ">
    <div class=" col-md-6  col-xs-12 q-pr-md-md">
      <div class="text-subtitle2 q-pb-sm">Profile Picture</div>
      <q-uploader
        class="full-width full-height"
        label="Upload Profile"
        flat
        bordered
        hide-upload-btn
        @added="addedPhoto"
        accept="image/*"
      >
        <template v-slot:list="scope">
          <q-img
            spinner-color="blue"
            :src="informationData.profileImgUrl"
          />
        </template>
      </q-uploader>
    </div>
    <div class="col-md-6 col-xs-12">
      <q-form class="row wrap justify-between q-gutter-y-md">
        <div class="col-xs-12">
          <div class="text-subtitle2 q-pb-sm">Name</div>
          <div class="q-gutter-y-sm ">
            <q-input
              dense
              outlined
              label="Title"
            />
            <q-input
              dense
              outlined
              label="Firstname"
            />
            <q-input
              dense
              outlined
              label="Middlename"
            />
            <q-input
              dense
              outlined
              label="Surname"
            />
          </div>
        </div>
        <div class="col-xs-12">
          <div class="text-subtitle2 q-pb-sm">Public Email</div>
          <q-input
            dense
            outlined
            type="email"
            label="Email"
            hint="You have set your email address to private. To toggle email privacy, go to email settings and uncheck 'Keep my email address private.'"
          />
        </div>

        <div class="col-xs-12 q-pt-sm">
          <div class="text-subtitle2 q-pb-sm">Phone Number</div>
          <q-input
            dense
            outlined
            placeholder="Number"
            autogrow
          />
        </div>

        <div class="col-xs-12">
          <div class="text-subtitle2 q-pb-sm">Bio</div>
          <q-input
            dense
            outlined
            placeholder="Tell us a little bit about your self"
            autogrow
            hint="You can @mention other users and School to link to them."
          />
        </div>

      </q-form>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      informationData: {
        profileImgUrl: ''
      }
    }
  },
  methods: {
    addedPhoto (data) {
      let imgData = data[0].__img['src']
      this.informationData.profileImgUrl = imgData
    }
  }
}
</script>

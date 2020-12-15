(module
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_i32_i32_=>_none (func (param i32 i32 i32)))
 (type $none_=>_i32 (func (result i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $i32_=>_none (func (param i32)))
 (type $i32_i32_i32_=>_i32 (func (param i32 i32 i32) (result i32)))
 (type $none_=>_none (func))
 (import "env" "memory" (memory $0 2 16))
 (data (i32.const 1036) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\d1\83Q+")
 (data (i32.const 1068) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00j7\12\e2")
 (data (i32.const 1100) "\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1132) "\18\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\18\00\00\00f\00l\00i\00p\00p\00e\00r\00.\00f\00l\00a\00g\00")
 (data (i32.const 1180) "\08\00\00\00\01\00\00\00\00\00\00\00\12\00\00\00\08\00\00\00\01\00\00\00\00\00\00\00")
 (data (i32.const 1212) "\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1244) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\c0\96\a5\f3")
 (data (i32.const 1276) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\1e\\\a4V")
 (import "seal0" "seal_input" (func $../../src/env/seal0/seal_input (param i32 i32)))
 (import "seal0" "seal_hash_sha2_256" (func $../../src/env/seal0/seal_hash_sha2_256 (param i32 i32 i32)))
 (import "seal0" "seal_set_storage" (func $../../src/env/seal0/seal_set_storage (param i32 i32 i32)))
 (import "seal0" "seal_get_storage" (func $../../src/env/seal0/seal_get_storage (param i32 i32 i32) (result i32)))
 (import "seal0" "seal_return" (func $../../src/env/seal0/seal_return (param i32 i32 i32)))
 (table $0 2 funcref)
 (elem (i32.const 1) $../../src/env/seal0/seal_hash_sha2_256)
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (export "deploy" (func $flipper/deploy))
 (export "call" (func $flipper/call))
 (start $~start)
 (func $~lib/rt/stub/maybeGrowMemory (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (if
   (i32.lt_u
    (local.tee $1
     (i32.and
      (i32.add
       (i32.shl
        (local.tee $2
         (memory.size)
        )
        (i32.const 16)
       )
       (i32.const 15)
      )
      (i32.const -16)
     )
    )
    (local.get $0)
   )
   (if
    (i32.lt_s
     (memory.grow
      (select
       (local.get $2)
       (local.tee $3
        (local.tee $1
         (i32.shr_u
          (i32.and
           (i32.add
            (i32.sub
             (local.get $0)
             (local.get $1)
            )
            (i32.const 65535)
           )
           (i32.const -65536)
          )
          (i32.const 16)
         )
        )
       )
       (i32.gt_s
        (local.get $2)
        (local.get $3)
       )
      )
     )
     (i32.const 0)
    )
    (if
     (i32.lt_s
      (memory.grow
       (local.get $1)
      )
      (i32.const 0)
     )
     (unreachable)
    )
   )
  )
  (global.set $~lib/rt/stub/offset
   (local.get $0)
  )
 )
 (func $~lib/rt/stub/__alloc (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741820)
   )
   (unreachable)
  )
  (local.set $1
   (global.get $~lib/rt/stub/offset)
  )
  (call $~lib/rt/stub/maybeGrowMemory
   (i32.add
    (local.tee $2
     (i32.add
      (global.get $~lib/rt/stub/offset)
      (i32.const 4)
     )
    )
    (local.tee $0
     (i32.sub
      (i32.and
       (i32.add
        (local.get $0)
        (i32.const 19)
       )
       (i32.const -16)
      )
      (i32.const 4)
     )
    )
   )
  )
  (i32.store
   (local.get $1)
   (local.get $0)
  )
  (local.get $2)
 )
 (func $~lib/rt/stub/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741804)
   )
   (unreachable)
  )
  (i32.store offset=4
   (local.tee $2
    (i32.sub
     (local.tee $3
      (call $~lib/rt/stub/__alloc
       (i32.add
        (local.get $0)
        (i32.const 16)
       )
      )
     )
     (i32.const 4)
    )
   )
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $2)
   (i32.const 0)
  )
  (i32.store offset=12
   (local.get $2)
   (local.get $1)
  )
  (i32.store offset=16
   (local.get $2)
   (local.get $0)
  )
  (i32.add
   (local.get $3)
   (i32.const 16)
  )
 )
 (func $~lib/memory/memory.fill (param $0 i32) (param $1 i32)
  (local $2 i32)
  (block $~lib/util/memory/memset|inlined.0
   (br_if $~lib/util/memory/memset|inlined.0
    (i32.eqz
     (local.get $1)
    )
   )
   (i32.store8
    (local.get $0)
    (i32.const 0)
   )
   (i32.store8 offset=3
    (local.tee $2
     (i32.sub
      (i32.add
       (local.get $0)
       (local.get $1)
      )
      (i32.const 4)
     )
    )
    (i32.const 0)
   )
   (br_if $~lib/util/memory/memset|inlined.0
    (i32.le_u
     (local.get $1)
     (i32.const 2)
    )
   )
   (i32.store8 offset=1
    (local.get $0)
    (i32.const 0)
   )
   (i32.store8 offset=2
    (local.get $0)
    (i32.const 0)
   )
   (i32.store8 offset=2
    (local.get $2)
    (i32.const 0)
   )
   (i32.store8 offset=1
    (local.get $2)
    (i32.const 0)
   )
   (br_if $~lib/util/memory/memset|inlined.0
    (i32.le_u
     (local.get $1)
     (i32.const 6)
    )
   )
   (i32.store8 offset=3
    (local.get $0)
    (i32.const 0)
   )
   (i32.store8
    (local.get $2)
    (i32.const 0)
   )
   (br_if $~lib/util/memory/memset|inlined.0
    (i32.le_u
     (local.get $1)
     (i32.const 8)
    )
   )
   (i32.store
    (local.tee $0
     (i32.add
      (local.tee $2
       (i32.and
        (i32.sub
         (i32.const 0)
         (local.get $0)
        )
        (i32.const 3)
       )
      )
      (local.get $0)
     )
    )
    (i32.const 0)
   )
   (i32.store offset=24
    (local.tee $2
     (i32.sub
      (i32.add
       (local.get $0)
       (local.tee $1
        (i32.and
         (i32.sub
          (local.get $1)
          (local.get $2)
         )
         (i32.const -4)
        )
       )
      )
      (i32.const 28)
     )
    )
    (i32.const 0)
   )
   (br_if $~lib/util/memory/memset|inlined.0
    (i32.le_u
     (local.get $1)
     (i32.const 8)
    )
   )
   (i32.store offset=4
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=8
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=16
    (local.get $2)
    (i32.const 0)
   )
   (i32.store offset=20
    (local.get $2)
    (i32.const 0)
   )
   (br_if $~lib/util/memory/memset|inlined.0
    (i32.le_u
     (local.get $1)
     (i32.const 24)
    )
   )
   (i32.store offset=12
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=16
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=20
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=24
    (local.get $0)
    (i32.const 0)
   )
   (i32.store
    (local.get $2)
    (i32.const 0)
   )
   (i32.store offset=4
    (local.get $2)
    (i32.const 0)
   )
   (i32.store offset=8
    (local.get $2)
    (i32.const 0)
   )
   (i32.store offset=12
    (local.get $2)
    (i32.const 0)
   )
   (local.set $0
    (i32.add
     (local.tee $2
      (i32.add
       (i32.and
        (local.get $0)
        (i32.const 4)
       )
       (i32.const 24)
      )
     )
     (local.get $0)
    )
   )
   (local.set $1
    (i32.sub
     (local.get $1)
     (local.get $2)
    )
   )
   (loop $while-continue|0
    (if
     (i32.ge_u
      (local.get $1)
      (i32.const 32)
     )
     (block
      (i64.store
       (local.get $0)
       (i64.const 0)
      )
      (i64.store offset=8
       (local.get $0)
       (i64.const 0)
      )
      (i64.store offset=16
       (local.get $0)
       (i64.const 0)
      )
      (i64.store offset=24
       (local.get $0)
       (i64.const 0)
      )
      (local.set $1
       (i32.sub
        (local.get $1)
        (i32.const 32)
       )
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (i32.const 32)
       )
      )
      (br $while-continue|0)
     )
    )
   )
  )
 )
 (func $~lib/typedarray/Uint8Array#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (if
   (i32.eqz
    (local.tee $1
     (call $~lib/rt/stub/__new
      (i32.const 12)
      (i32.const 6)
     )
    )
   )
   (local.set $1
    (call $~lib/rt/stub/__new
     (i32.const 12)
     (i32.const 2)
    )
   )
  )
  (i32.store
   (local.get $1)
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $1)
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $1)
   (i32.const 0)
  )
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741820)
   )
   (unreachable)
  )
  (call $~lib/memory/memory.fill
   (local.tee $2
    (call $~lib/rt/stub/__new
     (local.get $0)
     (i32.const 0)
    )
   )
   (local.get $0)
  )
  (drop
   (i32.load
    (local.get $1)
   )
  )
  (i32.store
   (local.get $1)
   (local.get $2)
  )
  (i32.store offset=4
   (local.get $1)
   (local.get $2)
  )
  (i32.store offset=8
   (local.get $1)
   (local.get $0)
  )
  (local.get $1)
 )
 (func $../../src/primitives/readbuffer/ReadBuffer#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (i32.store
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 8)
     (i32.const 5)
    )
   )
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $2)
   (i32.const 0)
  )
  (local.set $4
   (call $~lib/typedarray/Uint8Array#constructor
    (local.get $0)
   )
  )
  (drop
   (i32.load
    (local.get $2)
   )
  )
  (i32.store
   (local.get $2)
   (local.get $4)
  )
  (i32.store
   (local.tee $3
    (call $~lib/rt/stub/__new
     (i32.const 4)
     (i32.const 7)
    )
   )
   (i32.const 0)
  )
  (local.set $1
   (call $~lib/typedarray/Uint8Array#constructor
    (i32.const 4)
   )
  )
  (drop
   (i32.load
    (local.get $3)
   )
  )
  (i32.store
   (local.get $3)
   (local.get $1)
  )
  (local.set $1
   (i32.const 0)
  )
  (loop $for-loop|0
   (if
    (i32.lt_s
     (local.get $1)
     (i32.const 4)
    )
    (block
     (if
      (i32.ge_u
       (local.tee $4
        (local.get $1)
       )
       (i32.load offset=8
        (local.tee $6
         (i32.load
          (local.get $3)
         )
        )
       )
      )
      (unreachable)
     )
     (local.set $5
      (i32.and
       (i32.shr_u
        (local.get $0)
        (i32.shl
         (local.get $1)
         (i32.const 3)
        )
       )
       (i32.const 255)
      )
     )
     (i32.store8
      (i32.add
       (i32.load offset=4
        (local.get $6)
       )
       (local.get $4)
      )
      (local.get $5)
     )
     (local.set $1
      (i32.add
       (local.get $1)
       (i32.const 1)
      )
     )
     (br $for-loop|0)
    )
   )
  )
  (local.set $0
   (local.get $3)
  )
  (drop
   (i32.load offset=4
    (local.get $2)
   )
  )
  (i32.store offset=4
   (local.get $2)
   (local.get $0)
  )
  (local.get $2)
 )
 (func $../../src/messages/inputdata/MessageInputReader#constructor (result i32)
  (local $0 i32)
  (local $1 i32)
  (i32.store
   (local.tee $0
    (call $~lib/rt/stub/__new
     (i32.const 4)
     (i32.const 4)
    )
   )
   (i32.const 0)
  )
  (local.set $1
   (call $../../src/primitives/readbuffer/ReadBuffer#constructor
    (i32.const 16)
   )
  )
  (drop
   (i32.load
    (local.get $0)
   )
  )
  (i32.store
   (local.get $0)
   (local.get $1)
  )
  (call $../../src/env/seal0/seal_input
   (i32.load
    (i32.load
     (i32.load
      (local.get $0)
     )
    )
   )
   (i32.load
    (i32.load
     (i32.load offset=4
      (i32.load
       (local.get $0)
      )
     )
    )
   )
  )
  (local.get $0)
 )
 (func $../../src/primitives/sizebuffer/SizeBuffer#get:value (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local.set $1
   (i32.const 3)
  )
  (loop $for-loop|0
   (if
    (i32.ge_s
     (local.get $1)
     (i32.const 0)
    )
    (block
     (if
      (i32.ge_u
       (local.tee $3
        (local.get $1)
       )
       (i32.load offset=8
        (local.tee $4
         (i32.load
          (local.get $0)
         )
        )
       )
      )
      (unreachable)
     )
     (local.set $2
      (i32.or
       (i32.shl
        (i32.load8_u
         (i32.add
          (i32.load offset=4
           (local.get $4)
          )
          (local.get $3)
         )
        )
        (i32.shl
         (local.get $1)
         (i32.const 3)
        )
       )
       (local.get $2)
      )
     )
     (local.set $1
      (i32.sub
       (local.get $1)
       (i32.const 1)
      )
     )
     (br $for-loop|0)
    )
   )
  )
  (local.get $2)
 )
 (func $~lib/array/Array<u8>#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (i32.store
   (local.tee $1
    (call $~lib/rt/stub/__new
     (i32.const 16)
     (i32.const 8)
    )
   )
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $1)
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $1)
   (i32.const 0)
  )
  (i32.store offset=12
   (local.get $1)
   (i32.const 0)
  )
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741820)
   )
   (unreachable)
  )
  (call $~lib/memory/memory.fill
   (local.tee $2
    (call $~lib/rt/stub/__new
     (local.tee $3
      (local.get $0)
     )
     (i32.const 0)
    )
   )
   (local.get $0)
  )
  (drop
   (i32.ne
    (local.tee $4
     (local.get $2)
    )
    (i32.load
     (local.get $1)
    )
   )
  )
  (i32.store
   (local.get $1)
   (local.get $4)
  )
  (i32.store offset=4
   (local.get $1)
   (local.get $2)
  )
  (i32.store offset=8
   (local.get $1)
   (local.get $3)
  )
  (i32.store offset=12
   (local.get $1)
   (local.get $0)
  )
  (local.get $1)
 )
 (func $~lib/util/memory/memcpy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (loop $while-continue|0
   (if
    (select
     (i32.and
      (local.get $1)
      (i32.const 3)
     )
     (i32.const 0)
     (local.get $2)
    )
    (block
     (local.set $0
      (i32.add
       (local.tee $3
        (local.get $0)
       )
       (i32.const 1)
      )
     )
     (i32.store8
      (local.get $3)
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $3
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (i32.load8_u
        (local.get $3)
       )
      )
     )
     (local.set $2
      (i32.sub
       (local.get $2)
       (i32.const 1)
      )
     )
     (br $while-continue|0)
    )
   )
  )
  (if
   (i32.eqz
    (i32.and
     (local.get $0)
     (i32.const 3)
    )
   )
   (block
    (loop $while-continue|1
     (if
      (i32.ge_u
       (local.get $2)
       (i32.const 16)
      )
      (block
       (i32.store
        (local.get $0)
        (i32.load
         (local.get $1)
        )
       )
       (i32.store offset=4
        (local.get $0)
        (i32.load offset=4
         (local.get $1)
        )
       )
       (i32.store offset=8
        (local.get $0)
        (i32.load offset=8
         (local.get $1)
        )
       )
       (i32.store offset=12
        (local.get $0)
        (i32.load offset=12
         (local.get $1)
        )
       )
       (local.set $1
        (i32.add
         (local.get $1)
         (i32.const 16)
        )
       )
       (local.set $0
        (i32.add
         (local.get $0)
         (i32.const 16)
        )
       )
       (local.set $2
        (i32.sub
         (local.get $2)
         (i32.const 16)
        )
       )
       (br $while-continue|1)
      )
     )
    )
    (if
     (i32.and
      (local.get $2)
      (i32.const 8)
     )
     (block
      (i32.store
       (local.get $0)
       (i32.load
        (local.get $1)
       )
      )
      (i32.store offset=4
       (local.get $0)
       (i32.load offset=4
        (local.get $1)
       )
      )
      (local.set $1
       (i32.add
        (local.get $1)
        (i32.const 8)
       )
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (i32.const 8)
       )
      )
     )
    )
    (if
     (i32.and
      (local.get $2)
      (i32.const 4)
     )
     (block
      (i32.store
       (local.get $0)
       (i32.load
        (local.get $1)
       )
      )
      (local.set $1
       (i32.add
        (local.get $1)
        (i32.const 4)
       )
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (i32.const 4)
       )
      )
     )
    )
    (if
     (i32.and
      (local.get $2)
      (i32.const 2)
     )
     (block
      (i32.store16
       (local.get $0)
       (i32.load16_u
        (local.get $1)
       )
      )
      (local.set $1
       (i32.add
        (local.get $1)
        (i32.const 2)
       )
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (i32.const 2)
       )
      )
     )
    )
    (if
     (i32.and
      (local.get $2)
      (i32.const 1)
     )
     (block
      (local.set $3
       (local.get $0)
      )
      (i32.store8
       (local.get $3)
       (block (result i32)
        (local.set $3
         (local.get $1)
        )
        (i32.load8_u
         (local.get $3)
        )
       )
      )
     )
    )
    (return)
   )
  )
  (if
   (i32.ge_u
    (local.get $2)
    (i32.const 32)
   )
   (block $break|2
    (block $case2|2
     (block $case1|2
      (block $case0|2
       (br_table $case0|2 $case1|2 $case2|2 $break|2
        (i32.sub
         (i32.and
          (local.get $0)
          (i32.const 3)
         )
         (i32.const 1)
        )
       )
      )
      (local.set $4
       (i32.load
        (local.get $1)
       )
      )
      (local.set $0
       (i32.add
        (local.tee $3
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (i32.store8
       (local.get $3)
       (block (result i32)
        (local.set $1
         (i32.add
          (local.tee $3
           (local.get $1)
          )
          (i32.const 1)
         )
        )
        (i32.load8_u
         (local.get $3)
        )
       )
      )
      (local.set $0
       (i32.add
        (local.tee $3
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (i32.store8
       (local.get $3)
       (block (result i32)
        (local.set $1
         (i32.add
          (local.tee $3
           (local.get $1)
          )
          (i32.const 1)
         )
        )
        (i32.load8_u
         (local.get $3)
        )
       )
      )
      (local.set $0
       (i32.add
        (local.tee $3
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (i32.store8
       (local.get $3)
       (block (result i32)
        (local.set $1
         (i32.add
          (local.tee $3
           (local.get $1)
          )
          (i32.const 1)
         )
        )
        (i32.load8_u
         (local.get $3)
        )
       )
      )
      (local.set $2
       (i32.sub
        (local.get $2)
        (i32.const 3)
       )
      )
      (loop $while-continue|3
       (if
        (i32.ge_u
         (local.get $2)
         (i32.const 17)
        )
        (block
         (i32.store
          (local.get $0)
          (i32.or
           (i32.shl
            (local.tee $3
             (i32.load offset=1
              (local.get $1)
             )
            )
            (i32.const 8)
           )
           (i32.shr_u
            (local.get $4)
            (i32.const 24)
           )
          )
         )
         (i32.store offset=4
          (local.get $0)
          (i32.or
           (i32.shl
            (local.tee $4
             (i32.load offset=5
              (local.get $1)
             )
            )
            (i32.const 8)
           )
           (i32.shr_u
            (local.get $3)
            (i32.const 24)
           )
          )
         )
         (i32.store offset=8
          (local.get $0)
          (i32.or
           (i32.shl
            (local.tee $3
             (i32.load offset=9
              (local.get $1)
             )
            )
            (i32.const 8)
           )
           (i32.shr_u
            (local.get $4)
            (i32.const 24)
           )
          )
         )
         (i32.store offset=12
          (local.get $0)
          (i32.or
           (i32.shl
            (local.tee $4
             (i32.load offset=13
              (local.get $1)
             )
            )
            (i32.const 8)
           )
           (i32.shr_u
            (local.get $3)
            (i32.const 24)
           )
          )
         )
         (local.set $1
          (i32.add
           (local.get $1)
           (i32.const 16)
          )
         )
         (local.set $0
          (i32.add
           (local.get $0)
           (i32.const 16)
          )
         )
         (local.set $2
          (i32.sub
           (local.get $2)
           (i32.const 16)
          )
         )
         (br $while-continue|3)
        )
       )
      )
      (br $break|2)
     )
     (local.set $4
      (i32.load
       (local.get $1)
      )
     )
     (local.set $0
      (i32.add
       (local.tee $3
        (local.get $0)
       )
       (i32.const 1)
      )
     )
     (i32.store8
      (local.get $3)
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $3
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (i32.load8_u
        (local.get $3)
       )
      )
     )
     (local.set $0
      (i32.add
       (local.tee $3
        (local.get $0)
       )
       (i32.const 1)
      )
     )
     (i32.store8
      (local.get $3)
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $3
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (i32.load8_u
        (local.get $3)
       )
      )
     )
     (local.set $2
      (i32.sub
       (local.get $2)
       (i32.const 2)
      )
     )
     (loop $while-continue|4
      (if
       (i32.ge_u
        (local.get $2)
        (i32.const 18)
       )
       (block
        (i32.store
         (local.get $0)
         (i32.or
          (i32.shl
           (local.tee $3
            (i32.load offset=2
             (local.get $1)
            )
           )
           (i32.const 16)
          )
          (i32.shr_u
           (local.get $4)
           (i32.const 16)
          )
         )
        )
        (i32.store offset=4
         (local.get $0)
         (i32.or
          (i32.shl
           (local.tee $4
            (i32.load offset=6
             (local.get $1)
            )
           )
           (i32.const 16)
          )
          (i32.shr_u
           (local.get $3)
           (i32.const 16)
          )
         )
        )
        (i32.store offset=8
         (local.get $0)
         (i32.or
          (i32.shl
           (local.tee $3
            (i32.load offset=10
             (local.get $1)
            )
           )
           (i32.const 16)
          )
          (i32.shr_u
           (local.get $4)
           (i32.const 16)
          )
         )
        )
        (i32.store offset=12
         (local.get $0)
         (i32.or
          (i32.shl
           (local.tee $4
            (i32.load offset=14
             (local.get $1)
            )
           )
           (i32.const 16)
          )
          (i32.shr_u
           (local.get $3)
           (i32.const 16)
          )
         )
        )
        (local.set $1
         (i32.add
          (local.get $1)
          (i32.const 16)
         )
        )
        (local.set $0
         (i32.add
          (local.get $0)
          (i32.const 16)
         )
        )
        (local.set $2
         (i32.sub
          (local.get $2)
          (i32.const 16)
         )
        )
        (br $while-continue|4)
       )
      )
     )
     (br $break|2)
    )
    (local.set $4
     (i32.load
      (local.get $1)
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $2
     (i32.sub
      (local.get $2)
      (i32.const 1)
     )
    )
    (loop $while-continue|5
     (if
      (i32.ge_u
       (local.get $2)
       (i32.const 19)
      )
      (block
       (i32.store
        (local.get $0)
        (i32.or
         (i32.shl
          (local.tee $3
           (i32.load offset=3
            (local.get $1)
           )
          )
          (i32.const 24)
         )
         (i32.shr_u
          (local.get $4)
          (i32.const 8)
         )
        )
       )
       (i32.store offset=4
        (local.get $0)
        (i32.or
         (i32.shl
          (local.tee $4
           (i32.load offset=7
            (local.get $1)
           )
          )
          (i32.const 24)
         )
         (i32.shr_u
          (local.get $3)
          (i32.const 8)
         )
        )
       )
       (i32.store offset=8
        (local.get $0)
        (i32.or
         (i32.shl
          (local.tee $3
           (i32.load offset=11
            (local.get $1)
           )
          )
          (i32.const 24)
         )
         (i32.shr_u
          (local.get $4)
          (i32.const 8)
         )
        )
       )
       (i32.store offset=12
        (local.get $0)
        (i32.or
         (i32.shl
          (local.tee $4
           (i32.load offset=15
            (local.get $1)
           )
          )
          (i32.const 24)
         )
         (i32.shr_u
          (local.get $3)
          (i32.const 8)
         )
        )
       )
       (local.set $1
        (i32.add
         (local.get $1)
         (i32.const 16)
        )
       )
       (local.set $0
        (i32.add
         (local.get $0)
         (i32.const 16)
        )
       )
       (local.set $2
        (i32.sub
         (local.get $2)
         (i32.const 16)
        )
       )
       (br $while-continue|5)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (local.get $2)
    (i32.const 16)
   )
   (block
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (local.get $2)
    (i32.const 8)
   )
   (block
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (local.get $2)
    (i32.const 4)
   )
   (block
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (local.get $2)
    (i32.const 2)
   )
   (block
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
    (local.set $0
     (i32.add
      (local.tee $3
       (local.get $0)
      )
      (i32.const 1)
     )
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $3
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (local.get $2)
    (i32.const 1)
   )
   (block
    (local.set $3
     (local.get $0)
    )
    (i32.store8
     (local.get $3)
     (block (result i32)
      (local.set $3
       (local.get $1)
      )
      (i32.load8_u
       (local.get $3)
      )
     )
    )
   )
  )
 )
 (func $~lib/memory/memory.copy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (block $~lib/util/memory/memmove|inlined.0
   (local.set $3
    (local.get $2)
   )
   (br_if $~lib/util/memory/memmove|inlined.0
    (i32.eq
     (local.tee $2
      (local.get $0)
     )
     (local.get $1)
    )
   )
   (if
    (i32.le_u
     (i32.sub
      (i32.sub
       (local.get $1)
       (local.get $2)
      )
      (local.get $3)
     )
     (i32.sub
      (i32.const 0)
      (i32.shl
       (local.get $3)
       (i32.const 1)
      )
     )
    )
    (block
     (call $~lib/util/memory/memcpy
      (local.get $2)
      (local.get $1)
      (local.get $3)
     )
     (br $~lib/util/memory/memmove|inlined.0)
    )
   )
   (if
    (i32.gt_u
     (local.get $1)
     (local.get $2)
    )
    (block
     (if
      (i32.eq
       (i32.and
        (local.get $1)
        (i32.const 7)
       )
       (i32.and
        (local.get $2)
        (i32.const 7)
       )
      )
      (block
       (loop $while-continue|0
        (if
         (i32.and
          (local.get $2)
          (i32.const 7)
         )
         (block
          (br_if $~lib/util/memory/memmove|inlined.0
           (i32.eqz
            (local.get $3)
           )
          )
          (local.set $3
           (i32.sub
            (local.get $3)
            (i32.const 1)
           )
          )
          (local.set $2
           (i32.add
            (local.tee $0
             (local.get $2)
            )
            (i32.const 1)
           )
          )
          (i32.store8
           (local.get $0)
           (block (result i32)
            (local.set $1
             (i32.add
              (local.tee $0
               (local.get $1)
              )
              (i32.const 1)
             )
            )
            (i32.load8_u
             (local.get $0)
            )
           )
          )
          (br $while-continue|0)
         )
        )
       )
       (loop $while-continue|1
        (if
         (i32.ge_u
          (local.get $3)
          (i32.const 8)
         )
         (block
          (i64.store
           (local.get $2)
           (i64.load
            (local.get $1)
           )
          )
          (local.set $3
           (i32.sub
            (local.get $3)
            (i32.const 8)
           )
          )
          (local.set $2
           (i32.add
            (local.get $2)
            (i32.const 8)
           )
          )
          (local.set $1
           (i32.add
            (local.get $1)
            (i32.const 8)
           )
          )
          (br $while-continue|1)
         )
        )
       )
      )
     )
     (loop $while-continue|2
      (if
       (local.get $3)
       (block
        (local.set $2
         (i32.add
          (local.tee $0
           (local.get $2)
          )
          (i32.const 1)
         )
        )
        (i32.store8
         (local.get $0)
         (block (result i32)
          (local.set $1
           (i32.add
            (local.tee $0
             (local.get $1)
            )
            (i32.const 1)
           )
          )
          (i32.load8_u
           (local.get $0)
          )
         )
        )
        (local.set $3
         (i32.sub
          (local.get $3)
          (i32.const 1)
         )
        )
        (br $while-continue|2)
       )
      )
     )
    )
    (block
     (if
      (i32.eq
       (i32.and
        (local.get $1)
        (i32.const 7)
       )
       (i32.and
        (local.get $2)
        (i32.const 7)
       )
      )
      (block
       (loop $while-continue|3
        (if
         (i32.and
          (i32.add
           (local.get $2)
           (local.get $3)
          )
          (i32.const 7)
         )
         (block
          (br_if $~lib/util/memory/memmove|inlined.0
           (i32.eqz
            (local.get $3)
           )
          )
          (i32.store8
           (i32.add
            (local.get $2)
            (local.tee $3
             (i32.sub
              (local.get $3)
              (i32.const 1)
             )
            )
           )
           (i32.load8_u
            (i32.add
             (local.get $1)
             (local.get $3)
            )
           )
          )
          (br $while-continue|3)
         )
        )
       )
       (loop $while-continue|4
        (if
         (i32.ge_u
          (local.get $3)
          (i32.const 8)
         )
         (block
          (i64.store
           (i32.add
            (local.get $2)
            (local.tee $3
             (i32.sub
              (local.get $3)
              (i32.const 8)
             )
            )
           )
           (i64.load
            (i32.add
             (local.get $1)
             (local.get $3)
            )
           )
          )
          (br $while-continue|4)
         )
        )
       )
      )
     )
     (loop $while-continue|5
      (if
       (local.get $3)
       (block
        (i32.store8
         (i32.add
          (local.get $2)
          (local.tee $3
           (i32.sub
            (local.get $3)
            (i32.const 1)
           )
          )
         )
         (i32.load8_u
          (i32.add
           (local.get $1)
           (local.get $3)
          )
         )
        )
        (br $while-continue|5)
       )
      )
     )
    )
   )
  )
 )
 (func $~lib/array/Array<u8>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (if
   (i32.ge_u
    (local.get $1)
    (i32.load offset=12
     (local.get $0)
    )
   )
   (block
    (if
     (i32.lt_s
      (local.get $1)
      (i32.const 0)
     )
     (unreachable)
    )
    (if
     (i32.gt_u
      (local.tee $4
       (i32.add
        (local.get $1)
        (i32.const 1)
       )
      )
      (local.tee $9
       (i32.load offset=8
        (local.tee $7
         (local.get $0)
        )
       )
      )
     )
     (block
      (if
       (i32.gt_u
        (local.get $4)
        (i32.const 1073741820)
       )
       (unreachable)
      )
      (call $~lib/memory/memory.fill
       (block (result i32)
        (local.set $3
         (local.tee $13
          (i32.load
           (local.get $7)
          )
         )
        )
        (if
         (i32.gt_u
          (local.tee $10
           (local.get $4)
          )
          (i32.const 1073741804)
         )
         (unreachable)
        )
        (local.set $5
         (i32.add
          (local.get $4)
          (i32.const 16)
         )
        )
        (if
         (i32.eqz
          (select
           (i32.eqz
            (i32.and
             (local.tee $3
              (i32.sub
               (local.get $3)
               (i32.const 16)
              )
             )
             (i32.const 15)
            )
           )
           (i32.const 0)
           (local.get $3)
          )
         )
         (unreachable)
        )
        (local.set $12
         (i32.eq
          (global.get $~lib/rt/stub/offset)
          (i32.add
           (local.tee $8
            (i32.load
             (local.tee $11
              (i32.sub
               (local.get $3)
               (i32.const 4)
              )
             )
            )
           )
           (local.get $3)
          )
         )
        )
        (local.set $6
         (i32.sub
          (i32.and
           (i32.add
            (local.get $5)
            (i32.const 19)
           )
           (i32.const -16)
          )
          (i32.const 4)
         )
        )
        (if
         (i32.gt_u
          (local.get $5)
          (local.get $8)
         )
         (if
          (local.get $12)
          (block
           (if
            (i32.gt_u
             (local.get $5)
             (i32.const 1073741820)
            )
            (unreachable)
           )
           (call $~lib/rt/stub/maybeGrowMemory
            (i32.add
             (local.get $3)
             (local.get $6)
            )
           )
           (i32.store
            (local.get $11)
            (local.get $6)
           )
          )
          (block
           (call $~lib/memory/memory.copy
            (local.tee $5
             (call $~lib/rt/stub/__alloc
              (select
               (local.get $6)
               (local.tee $5
                (i32.shl
                 (local.get $8)
                 (i32.const 1)
                )
               )
               (i32.lt_u
                (local.get $5)
                (local.get $6)
               )
              )
             )
            )
            (local.get $3)
            (local.get $8)
           )
           (local.set $3
            (local.get $5)
           )
          )
         )
         (if
          (local.get $12)
          (block
           (global.set $~lib/rt/stub/offset
            (i32.add
             (local.get $3)
             (local.get $6)
            )
           )
           (i32.store
            (local.get $11)
            (local.get $6)
           )
          )
         )
        )
        (i32.store offset=16
         (i32.sub
          (local.get $3)
          (i32.const 4)
         )
         (local.get $4)
        )
        (i32.add
         (local.tee $4
          (i32.add
           (local.get $3)
           (i32.const 16)
          )
         )
         (local.get $9)
        )
       )
       (i32.sub
        (local.get $10)
        (local.get $9)
       )
      )
      (if
       (i32.ne
        (local.get $4)
        (local.get $13)
       )
       (block
        (i32.store
         (local.get $7)
         (local.get $4)
        )
        (i32.store offset=4
         (local.get $7)
         (local.get $4)
        )
       )
      )
      (i32.store offset=8
       (local.get $7)
       (local.get $10)
      )
     )
    )
    (i32.store offset=12
     (local.get $0)
     (i32.add
      (local.get $1)
      (i32.const 1)
     )
    )
   )
  )
  (i32.store8
   (i32.add
    (i32.load offset=4
     (local.get $0)
    )
    (local.get $1)
   )
   (local.get $2)
  )
 )
 (func $../../src/utils/ArrayUtils/typedToArray (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local.set $3
   (call $~lib/array/Array<u8>#constructor
    (block (result i32)
     (if
      (i32.eq
       (local.get $1)
       (i32.const -1)
      )
      (local.set $1
       (i32.load offset=8
        (local.get $0)
       )
      )
     )
     (local.get $1)
    )
   )
  )
  (loop $for-loop|0
   (if
    (i32.gt_s
     (local.get $1)
     (local.get $2)
    )
    (block
     (call $~lib/array/Array<u8>#__set
      (local.get $3)
      (local.get $2)
      (block (result i32)
       (if
        (i32.ge_u
         (local.tee $4
          (local.get $2)
         )
         (i32.load offset=8
          (local.tee $5
           (local.get $0)
          )
         )
        )
        (unreachable)
       )
       (i32.load8_u
        (i32.add
         (i32.load offset=4
          (local.get $5)
         )
         (local.get $4)
        )
       )
      )
     )
     (local.set $2
      (i32.add
       (local.get $2)
       (i32.const 1)
      )
     )
     (br $for-loop|0)
    )
   )
  )
  (local.get $3)
 )
 (func $~lib/rt/__newArray (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (i32.store
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 16)
     (i32.const 8)
    )
   )
   (block (result i32)
    (local.set $3
     (call $~lib/rt/stub/__new
      (local.tee $4
       (local.get $0)
      )
      (i32.const 0)
     )
    )
    (if
     (local.get $1)
     (call $~lib/memory/memory.copy
      (local.get $3)
      (local.get $1)
      (local.get $4)
     )
    )
    (local.tee $1
     (local.get $3)
    )
   )
  )
  (i32.store offset=4
   (local.get $2)
   (local.get $1)
  )
  (i32.store offset=8
   (local.get $2)
   (local.get $0)
  )
  (i32.store offset=12
   (local.get $2)
   (local.get $0)
  )
  (local.get $2)
 )
 (func $~lib/array/Array<u8>#slice (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local.set $3
   (i32.load offset=12
    (local.get $0)
   )
  )
  (local.set $1
   (if (result i32)
    (i32.lt_s
     (local.get $1)
     (i32.const 0)
    )
    (select
     (local.tee $4
      (i32.add
       (local.get $1)
       (local.get $3)
      )
     )
     (i32.const 0)
     (i32.gt_s
      (local.get $4)
      (i32.const 0)
     )
    )
    (select
     (local.get $1)
     (local.get $3)
     (i32.lt_s
      (local.get $1)
      (local.get $3)
     )
    )
   )
  )
  (call $~lib/memory/memory.copy
   (i32.load offset=4
    (local.tee $2
     (call $~lib/rt/__newArray
      (local.tee $3
       (select
        (local.tee $4
         (i32.sub
          (if (result i32)
           (i32.lt_s
            (local.get $2)
            (i32.const 0)
           )
           (select
            (local.tee $4
             (i32.add
              (local.get $2)
              (local.get $3)
             )
            )
            (i32.const 0)
            (i32.gt_s
             (local.get $4)
             (i32.const 0)
            )
           )
           (select
            (local.get $2)
            (local.get $3)
            (i32.lt_s
             (local.get $2)
             (local.get $3)
            )
           )
          )
          (local.get $1)
         )
        )
        (i32.const 0)
        (i32.gt_s
         (local.get $4)
         (i32.const 0)
        )
       )
      )
      (i32.const 0)
     )
    )
   )
   (i32.add
    (i32.load offset=4
     (local.get $0)
    )
    (local.get $1)
   )
   (local.get $3)
  )
  (local.get $2)
 )
 (func $../../src/messages/inputdata/MessageInputReader#get:fnSelector (param $0 i32) (result i32)
  (local $1 i32)
  (call $~lib/array/Array<u8>#slice
   (block (result i32)
    (local.set $1
     (local.tee $0
      (i32.load
       (local.get $0)
      )
     )
    )
    (call $../../src/utils/ArrayUtils/typedToArray
     (i32.load
      (local.get $0)
     )
     (call $../../src/primitives/sizebuffer/SizeBuffer#get:value
      (i32.load offset=4
       (local.get $1)
      )
     )
    )
   )
   (i32.const 0)
   (i32.const 4)
  )
 )
 (func $flipper/isSelectorEqual (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (if
   (i32.ne
    (i32.load offset=12
     (local.get $0)
    )
    (i32.load offset=12
     (local.get $1)
    )
   )
   (return
    (i32.const 0)
   )
  )
  (loop $for-loop|0
   (if
    (i32.gt_s
     (i32.load offset=12
      (local.get $0)
     )
     (local.get $2)
    )
    (block
     (if
      (block (result i32)
       (if
        (i32.ge_u
         (local.tee $3
          (local.get $2)
         )
         (i32.load offset=12
          (local.tee $4
           (local.get $0)
          )
         )
        )
        (unreachable)
       )
       (i32.ne
        (i32.load8_u
         (i32.add
          (i32.load offset=4
           (local.get $4)
          )
          (local.get $3)
         )
        )
        (block (result i32)
         (if
          (i32.le_u
           (i32.load offset=12
            (local.tee $4
             (local.get $1)
            )
           )
           (local.get $2)
          )
          (unreachable)
         )
         (i32.load8_u
          (i32.add
           (i32.load offset=4
            (local.get $4)
           )
           (local.get $3)
          )
         )
        )
       )
      )
      (return
       (i32.const 0)
      )
     )
     (local.set $2
      (i32.add
       (local.get $2)
       (i32.const 1)
      )
     )
     (br $for-loop|0)
    )
   )
  )
  (i32.const 1)
 )
 (func $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#constructor (result i32)
  (local $0 i32)
  (i32.store
   (local.tee $0
    (call $~lib/rt/stub/__new
     (i32.const 4)
     (i32.const 14)
    )
   )
   (i32.const 0)
  )
  (drop
   (i32.load
    (local.get $0)
   )
  )
  (i32.store
   (local.get $0)
   (i32.const 1152)
  )
  (local.get $0)
 )
 (func $../../src/primitives/writebuffer/WriteBuffer#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (i32.store
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 4)
     (i32.const 15)
    )
   )
   (i32.const 0)
  )
  (if
   (i32.lt_u
    (local.tee $1
     (i32.load offset=16
      (i32.sub
       (local.tee $3
        (local.get $0)
       )
       (i32.const 20)
      )
     )
    )
    (i32.const 0)
   )
   (unreachable)
  )
  (local.set $0
   (local.get $1)
  )
  (i32.store
   (local.tee $1
    (call $~lib/rt/stub/__new
     (i32.const 12)
     (i32.const 6)
    )
   )
   (local.get $3)
  )
  (i32.store offset=8
   (local.get $1)
   (local.get $0)
  )
  (i32.store offset=4
   (local.get $1)
   (local.get $3)
  )
  (drop
   (i32.load
    (local.get $2)
   )
  )
  (i32.store
   (local.get $2)
   (local.get $1)
  )
  (local.get $2)
 )
 (func $~lib/string/String.UTF8.encode (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local.set $3
   (call $~lib/rt/stub/__new
    (block (result i32)
     (local.set $2
      (i32.add
       (local.tee $3
        (local.get $0)
       )
       (i32.load offset=16
        (i32.sub
         (local.get $0)
         (i32.const 20)
        )
       )
      )
     )
     (loop $while-continue|0
      (if
       (i32.gt_u
        (local.get $2)
        (local.get $3)
       )
       (block
        (local.set $1
         (if (result i32)
          (i32.lt_u
           (local.tee $4
            (i32.load16_u
             (local.get $3)
            )
           )
           (i32.const 128)
          )
          (i32.add
           (local.get $1)
           (i32.const 1)
          )
          (if (result i32)
           (i32.lt_u
            (local.get $4)
            (i32.const 2048)
           )
           (i32.add
            (local.get $1)
            (i32.const 2)
           )
           (block (result i32)
            (if
             (select
              (i32.lt_u
               (i32.add
                (local.get $3)
                (i32.const 2)
               )
               (local.get $2)
              )
              (i32.const 0)
              (i32.eq
               (i32.and
                (local.get $4)
                (i32.const 64512)
               )
               (i32.const 55296)
              )
             )
             (if
              (i32.eq
               (i32.and
                (i32.load16_u offset=2
                 (local.get $3)
                )
                (i32.const 64512)
               )
               (i32.const 56320)
              )
              (block
               (local.set $1
                (i32.add
                 (local.get $1)
                 (i32.const 4)
                )
               )
               (local.set $3
                (i32.add
                 (local.get $3)
                 (i32.const 4)
                )
               )
               (br $while-continue|0)
              )
             )
            )
            (i32.add
             (local.get $1)
             (i32.const 3)
            )
           )
          )
         )
        )
        (local.set $3
         (i32.add
          (local.get $3)
          (i32.const 2)
         )
        )
        (br $while-continue|0)
       )
      )
     )
     (local.get $1)
    )
    (i32.const 0)
   )
  )
  (local.set $4
   (i32.add
    (local.get $0)
    (i32.shl
     (i32.shr_u
      (i32.load offset=16
       (i32.sub
        (local.get $0)
        (i32.const 20)
       )
      )
      (i32.const 1)
     )
     (i32.const 1)
    )
   )
  )
  (local.set $2
   (local.get $3)
  )
  (loop $while-continue|00
   (if
    (i32.lt_u
     (local.get $0)
     (local.get $4)
    )
    (block
     (local.set $2
      (if (result i32)
       (i32.lt_u
        (local.tee $1
         (i32.load16_u
          (local.get $0)
         )
        )
        (i32.const 128)
       )
       (block (result i32)
        (i32.store8
         (local.get $2)
         (local.get $1)
        )
        (i32.add
         (local.get $2)
         (i32.const 1)
        )
       )
       (if (result i32)
        (i32.lt_u
         (local.get $1)
         (i32.const 2048)
        )
        (block (result i32)
         (i32.store16
          (local.get $2)
          (i32.or
           (i32.or
            (i32.shr_u
             (local.get $1)
             (i32.const 6)
            )
            (i32.const 192)
           )
           (i32.shl
            (i32.or
             (i32.and
              (local.get $1)
              (i32.const 63)
             )
             (i32.const 128)
            )
            (i32.const 8)
           )
          )
         )
         (i32.add
          (local.get $2)
          (i32.const 2)
         )
        )
        (block (result i32)
         (if
          (select
           (i32.lt_u
            (i32.add
             (local.get $0)
             (i32.const 2)
            )
            (local.get $4)
           )
           (i32.const 0)
           (i32.eq
            (i32.and
             (local.get $1)
             (i32.const 64512)
            )
            (i32.const 55296)
           )
          )
          (if
           (i32.eq
            (i32.and
             (local.tee $5
              (i32.load16_u offset=2
               (local.get $0)
              )
             )
             (i32.const 64512)
            )
            (i32.const 56320)
           )
           (block
            (i32.store
             (local.get $2)
             (i32.or
              (i32.or
               (i32.shr_u
                (local.tee $1
                 (i32.or
                  (i32.add
                   (i32.shl
                    (i32.and
                     (local.get $1)
                     (i32.const 1023)
                    )
                    (i32.const 10)
                   )
                   (i32.const 65536)
                  )
                  (i32.and
                   (local.get $5)
                   (i32.const 1023)
                  )
                 )
                )
                (i32.const 18)
               )
               (i32.const 240)
              )
              (i32.or
               (i32.or
                (i32.shl
                 (i32.or
                  (i32.and
                   (local.get $1)
                   (i32.const 63)
                  )
                  (i32.const 128)
                 )
                 (i32.const 24)
                )
                (i32.shl
                 (i32.or
                  (i32.and
                   (i32.shr_u
                    (local.get $1)
                    (i32.const 6)
                   )
                   (i32.const 63)
                  )
                  (i32.const 128)
                 )
                 (i32.const 16)
                )
               )
               (i32.shl
                (i32.or
                 (i32.and
                  (i32.shr_u
                   (local.get $1)
                   (i32.const 12)
                  )
                  (i32.const 63)
                 )
                 (i32.const 128)
                )
                (i32.const 8)
               )
              )
             )
            )
            (local.set $2
             (i32.add
              (local.get $2)
              (i32.const 4)
             )
            )
            (local.set $0
             (i32.add
              (local.get $0)
              (i32.const 4)
             )
            )
            (br $while-continue|00)
           )
          )
         )
         (i32.store16
          (local.get $2)
          (i32.or
           (i32.or
            (i32.shr_u
             (local.get $1)
             (i32.const 12)
            )
            (i32.const 224)
           )
           (i32.shl
            (i32.or
             (i32.and
              (i32.shr_u
               (local.get $1)
               (i32.const 6)
              )
              (i32.const 63)
             )
             (i32.const 128)
            )
            (i32.const 8)
           )
          )
         )
         (i32.store8 offset=2
          (local.get $2)
          (i32.or
           (i32.and
            (local.get $1)
            (i32.const 63)
           )
           (i32.const 128)
          )
         )
         (i32.add
          (local.get $2)
          (i32.const 3)
         )
        )
       )
      )
     )
     (local.set $0
      (i32.add
       (local.get $0)
       (i32.const 2)
      )
     )
     (br $while-continue|00)
    )
   )
  )
  (local.get $3)
 )
 (func $~lib/as-scale-codec/utils/Bytes/Bytes.copy<u8> (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (loop $for-loop|0
   (if
    (i32.gt_s
     (i32.load offset=12
      (local.get $1)
     )
     (local.get $3)
    )
    (if
     (i32.gt_s
      (i32.load offset=12
       (local.get $0)
      )
      (local.get $3)
     )
     (block
      (call $~lib/array/Array<u8>#__set
       (local.get $1)
       (i32.add
        (local.get $2)
        (local.get $3)
       )
       (block (result i32)
        (if
         (i32.ge_u
          (local.tee $4
           (local.get $3)
          )
          (i32.load offset=12
           (local.tee $5
            (local.get $0)
           )
          )
         )
         (unreachable)
        )
        (i32.load8_u
         (i32.add
          (i32.load offset=4
           (local.get $5)
          )
          (local.get $4)
         )
        )
       )
      )
      (local.set $3
       (i32.add
        (local.get $3)
        (i32.const 1)
       )
      )
      (br $for-loop|0)
     )
    )
   )
  )
 )
 (func $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#hashKey (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $0
   (call $../../src/primitives/writebuffer/WriteBuffer#constructor
    (call $~lib/string/String.UTF8.encode
     (i32.load
      (local.get $0)
     )
    )
   )
  )
  (local.set $1
   (call $~lib/typedarray/Uint8Array#constructor
    (i32.const 32)
   )
  )
  (call_indirect (type $i32_i32_i32_=>_none)
   (i32.load
    (i32.load
     (local.get $0)
    )
   )
   (i32.load offset=8
    (i32.load
     (local.get $0)
    )
   )
   (i32.load
    (local.get $1)
   )
   (i32.load
    (i32.const 1200)
   )
  )
  (local.set $1
   (call $../../src/utils/ArrayUtils/typedToArray
    (local.get $1)
    (i32.const -1)
   )
  )
  (local.set $2
   (call $~lib/rt/__newArray
    (i32.const 0)
    (i32.const 1232)
   )
  )
  (i32.store
   (local.tee $0
    (call $~lib/rt/stub/__new
     (i32.const 4)
     (i32.const 16)
    )
   )
   (i32.const 0)
  )
  (local.set $3
   (call $~lib/array/Array<u8>#constructor
    (i32.const 32)
   )
  )
  (drop
   (i32.load
    (local.get $0)
   )
  )
  (i32.store
   (local.get $0)
   (local.get $3)
  )
  (call $~lib/as-scale-codec/utils/Bytes/Bytes.copy<u8>
   (local.get $2)
   (i32.load
    (local.get $0)
   )
   (i32.const 0)
  )
  (call $~lib/as-scale-codec/utils/Bytes/Bytes.copy<u8>
   (block (result i32)
    (if
     (i32.gt_s
      (i32.load offset=12
       (local.get $1)
      )
      (i32.const 32)
     )
     (local.set $1
      (call $~lib/array/Array<u8>#slice
       (local.get $1)
       (i32.sub
        (i32.load offset=12
         (local.get $1)
        )
        (i32.const 32)
       )
       (i32.const 2147483647)
      )
     )
    )
    (local.get $1)
   )
   (i32.load
    (local.get $0)
   )
   (i32.sub
    (i32.const 32)
    (i32.load offset=12
     (local.get $1)
    )
   )
  )
  (local.set $1
   (local.get $0)
  )
  (local.set $0
   (call $~lib/array/Array<u8>#constructor
    (i32.const 32)
   )
  )
  (call $~lib/as-scale-codec/utils/Bytes/Bytes.copy<u8>
   (i32.load
    (local.get $1)
   )
   (local.get $0)
   (i32.const 0)
  )
  (i32.load
   (local.get $0)
  )
 )
 (func $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#store (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local.set $1
   (call $../../src/primitives/writebuffer/WriteBuffer#constructor
    (block (result i32)
     (call $~lib/array/Array<u8>#__set
      (local.tee $2
       (call $~lib/array/Array<u8>#constructor
        (i32.const 1)
       )
      )
      (i32.const 0)
      (i32.eqz
       (i32.eqz
        (i32.load8_u
         (local.get $1)
        )
       )
      )
     )
     (i32.load
      (local.get $2)
     )
    )
   )
  )
  (call $../../src/env/seal0/seal_set_storage
   (call $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#hashKey
    (local.get $0)
   )
   (i32.load
    (i32.load
     (local.get $1)
    )
   )
   (i32.load offset=8
    (i32.load
     (local.get $1)
    )
   )
  )
 )
 (func $flipper/Flipper#onDeploy (param $0 i32)
  (local $1 i32)
  (call $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#store
   (call $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#constructor)
   (block (result i32)
    (i32.store8
     (local.tee $1
      (call $~lib/rt/stub/__new
       (i32.const 1)
       (i32.const 11)
      )
     )
     (i32.const 0)
    )
    (i32.store8
     (local.get $1)
     (local.get $0)
    )
    (local.get $1)
   )
  )
 )
 (func $flipper/deploy (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local.set $3
   (call $../../src/messages/inputdata/MessageInputReader#get:fnSelector
    (local.tee $1
     (call $../../src/messages/inputdata/MessageInputReader#constructor)
    )
   )
  )
  (local.set $4
   (call $~lib/rt/__newArray
    (i32.const 4)
    (i32.const 1056)
   )
  )
  (local.set $2
   (call $~lib/rt/__newArray
    (i32.const 4)
    (i32.const 1088)
   )
  )
  (i32.store8
   (local.tee $0
    (call $~lib/rt/stub/__new
     (i32.const 1)
     (i32.const 10)
    )
   )
   (i32.const 0)
  )
  (i32.store8
   (local.get $0)
   (i32.const 0)
  )
  (if
   (call $flipper/isSelectorEqual
    (local.get $3)
    (local.get $4)
   )
   (call $flipper/Flipper#onDeploy
    (block (result i32)
     (if
      (i32.eqz
       (if (result i32)
        (i32.gt_s
         (i32.load offset=12
          (local.tee $0
           (block $__inlined_func$../../src/messages/inputdata/MessageInputReader#get:fnParameters (result i32)
            (if
             (block (result i32)
              (local.set $0
               (local.tee $2
                (i32.load
                 (local.get $1)
                )
               )
              )
              (i32.eq
               (i32.load offset=12
                (call $../../src/utils/ArrayUtils/typedToArray
                 (i32.load
                  (local.get $2)
                 )
                 (call $../../src/primitives/sizebuffer/SizeBuffer#get:value
                  (i32.load offset=4
                   (local.get $0)
                  )
                 )
                )
               )
               (i32.const 4)
              )
             )
             (br $__inlined_func$../../src/messages/inputdata/MessageInputReader#get:fnParameters
              (call $~lib/rt/__newArray
               (i32.const 0)
               (i32.const 1120)
              )
             )
            )
            (call $~lib/array/Array<u8>#slice
             (block (result i32)
              (local.set $2
               (local.tee $1
                (i32.load
                 (local.get $1)
                )
               )
              )
              (call $../../src/utils/ArrayUtils/typedToArray
               (i32.load
                (local.get $1)
               )
               (call $../../src/primitives/sizebuffer/SizeBuffer#get:value
                (i32.load offset=4
                 (local.get $2)
                )
               )
              )
             )
             (i32.const 4)
             (i32.const 2147483647)
            )
           )
          )
         )
         (i32.const 0)
        )
        (if (result i32)
         (block (result i32)
          (if
           (i32.eqz
            (i32.load offset=12
             (local.tee $1
              (local.get $0)
             )
            )
           )
           (unreachable)
          )
          (i32.eq
           (i32.load8_u
            (i32.load offset=4
             (local.get $1)
            )
           )
           (i32.const 1)
          )
         )
         (i32.const 1)
         (block (result i32)
          (if
           (i32.eqz
            (i32.load offset=12
             (local.get $0)
            )
           )
           (unreachable)
          )
          (i32.eqz
           (i32.load8_u
            (i32.load offset=4
             (local.get $1)
            )
           )
          )
         )
        )
        (i32.const 0)
       )
      )
      (unreachable)
     )
     (if
      (i32.eqz
       (i32.load offset=12
        (local.get $0)
       )
      )
      (unreachable)
     )
     (local.set $1
      (i32.eq
       (i32.load8_u
        (i32.load offset=4
         (local.get $0)
        )
       )
       (i32.const 1)
      )
     )
     (i32.store8
      (local.tee $0
       (call $~lib/rt/stub/__new
        (i32.const 1)
        (i32.const 11)
       )
      )
      (i32.const 0)
     )
     (i32.store8
      (local.get $0)
      (local.get $1)
     )
     (i32.load8_u
      (local.get $0)
     )
    )
   )
   (if
    (call $flipper/isSelectorEqual
     (local.get $3)
     (local.get $2)
    )
    (call $flipper/Flipper#onDeploy
     (i32.const 0)
    )
   )
  )
  (i32.const 0)
 )
 (func $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#load (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $1
   (call $../../src/primitives/readbuffer/ReadBuffer#constructor
    (block (result i32)
     (i32.store8
      (local.tee $1
       (call $~lib/rt/stub/__new
        (i32.const 1)
        (i32.const 11)
       )
      )
      (i32.const 0)
     )
     (i32.store8
      (local.get $1)
      (i32.const 0)
     )
     (local.set $3
      (local.get $1)
     )
     (i32.const 1)
    )
   )
  )
  (if
   (i32.eqz
    (if (result i32)
     (call $../../src/env/seal0/seal_get_storage
      (call $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#hashKey
       (local.get $0)
      )
      (i32.load
       (i32.load
        (local.get $1)
       )
      )
      (i32.load
       (i32.load
        (i32.load offset=4
         (local.get $1)
        )
       )
      )
     )
     (i32.const 0)
     (i32.eq
      (call $../../src/primitives/sizebuffer/SizeBuffer#get:value
       (i32.load offset=4
        (local.get $1)
       )
      )
      (i32.const 1)
     )
    )
   )
   (unreachable)
  )
  (local.set $0
   (local.get $3)
  )
  (if
   (i32.eqz
    (if (result i32)
     (i32.gt_s
      (i32.load offset=12
       (local.tee $2
        (call $../../src/utils/ArrayUtils/typedToArray
         (i32.load
          (local.get $1)
         )
         (call $../../src/primitives/sizebuffer/SizeBuffer#get:value
          (i32.load offset=4
           (local.get $1)
          )
         )
        )
       )
      )
      (i32.const 0)
     )
     (if (result i32)
      (block (result i32)
       (if
        (i32.eqz
         (i32.load offset=12
          (local.tee $1
           (local.get $2)
          )
         )
        )
        (unreachable)
       )
       (i32.eq
        (i32.load8_u
         (i32.load offset=4
          (local.get $1)
         )
        )
        (i32.const 1)
       )
      )
      (i32.const 1)
      (block (result i32)
       (if
        (i32.eqz
         (i32.load offset=12
          (local.get $2)
         )
        )
        (unreachable)
       )
       (i32.eqz
        (i32.load8_u
         (i32.load offset=4
          (local.get $1)
         )
        )
       )
      )
     )
     (i32.const 0)
    )
   )
   (unreachable)
  )
  (if
   (i32.eqz
    (i32.load offset=12
     (local.get $2)
    )
   )
   (unreachable)
  )
  (i32.store8
   (local.get $0)
   (i32.eq
    (i32.load8_u
     (i32.load offset=4
      (local.get $2)
     )
    )
    (i32.const 1)
   )
  )
  (local.get $3)
 )
 (func $flipper/call (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local.set $0
   (call $../../src/messages/inputdata/MessageInputReader#get:fnSelector
    (call $../../src/messages/inputdata/MessageInputReader#constructor)
   )
  )
  (i32.store8
   (local.tee $1
    (call $~lib/rt/stub/__new
     (i32.const 1)
     (i32.const 10)
    )
   )
   (i32.const 0)
  )
  (i32.store8
   (local.get $1)
   (i32.const 0)
  )
  (local.set $1
   (call $~lib/rt/__newArray
    (i32.const 4)
    (i32.const 1264)
   )
  )
  (local.set $2
   (call $~lib/rt/__newArray
    (i32.const 4)
    (i32.const 1296)
   )
  )
  (if
   (call $flipper/isSelectorEqual
    (local.get $0)
    (local.get $1)
   )
   (call $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#store
    (local.tee $0
     (call $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#constructor)
    )
    (block (result i32)
     (local.set $1
      (i32.eqz
       (i32.load8_u
        (call $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#load
         (local.get $0)
        )
       )
      )
     )
     (i32.store8
      (local.tee $0
       (call $~lib/rt/stub/__new
        (i32.const 1)
        (i32.const 11)
       )
      )
      (i32.const 0)
     )
     (i32.store8
      (local.get $0)
      (local.get $1)
     )
     (local.get $0)
    )
   )
   (if
    (call $flipper/isSelectorEqual
     (local.get $0)
     (local.get $2)
    )
    (block
     (local.set $1
      (i32.load8_u
       (call $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#load
        (call $../../src/storage/storage/Storage<~lib/as-scale-codec/Bool/Bool>#constructor)
       )
      )
     )
     (i32.store8
      (local.tee $0
       (call $~lib/rt/stub/__new
        (i32.const 1)
        (i32.const 11)
       )
      )
      (i32.const 0)
     )
     (i32.store8
      (local.get $0)
      (local.get $1)
     )
     (call $../../src/env/seal0/seal_return
      (i32.const 0)
      (i32.load
       (i32.load
        (local.tee $0
         (call $../../src/primitives/writebuffer/WriteBuffer#constructor
          (block (result i32)
           (call $~lib/array/Array<u8>#__set
            (local.tee $1
             (call $~lib/array/Array<u8>#constructor
              (i32.const 1)
             )
            )
            (i32.const 0)
            (i32.eqz
             (i32.eqz
              (i32.load8_u
               (local.get $0)
              )
             )
            )
           )
           (i32.load
            (local.get $1)
           )
          )
         )
        )
       )
      )
      (i32.load offset=8
       (i32.load
        (local.get $0)
       )
      )
     )
    )
   )
  )
  (i32.const 0)
 )
 (func $~start
  (global.set $~lib/rt/stub/offset
   (i32.const 1308)
  )
  (drop
   (call $~lib/rt/stub/__new
    (i32.const 0)
    (i32.const 3)
   )
  )
 )
)
